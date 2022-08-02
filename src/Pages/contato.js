import { useState, useEffect } from 'react';
import { Grid, TextField, makeStyles } from '@material-ui/core/';
import { Button } from '@mui/material/';
import SendIcon from '@mui/icons-material/Send';
import Alert from '@mui/material/Alert';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#c8e6c9',
        padding: '2px 10px 2px 10px',
        borderRadius: '5px',
        margin: '10px 0 10px 20px'
    },
}));

const Contatos = () => {
    const classes = useStyles();

    const url = 'http://localhost:5000/message'
    const [message, setMessage] = useState([]);
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');
    const [validator, setValidator] = useState(false);
    const [render, setRender] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(url)
            const data = await response.json();
            setMessage(data);
        }
        fetchData();
    }, [render])

    const sendMessage = () => {
        setValidator(false);
        if (author.length <= 0 || content.length <= 0) {
            return setValidator(!validator)
        }
        const bodyForm = {
            email: author,
            message: content,
        }

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bodyForm)
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.id) {
                    setRender(true);
                    setSuccess(true);
                    setTimeout(() => {
                        setSuccess(false);
                    }, 5000)
                }
            })

        setAuthor('');
        setContent('');
    }

    return (
        <>
            <Grid container direction="row" xs={12} style={{ padding: 10 }}>
                <TextField id="name" label="Nome ou email" value={author} onChange={(event) => { setAuthor(event.target.value) }} fullWidth />
                <TextField id="message" label="Mensagem" value={content} onChange={(event) => { setContent(event.target.value) }} fullWidth />
            </Grid>

            {validator &&
                <div className="alert alert-warning alert-dismissible fade show mt-2" role="alert">
                    <Alert severity="error" onClose={() => { setValidator(false); }}><strong>Por favor preencha todos os campos! </strong></Alert>
                </div>
            }

            {success &&
                <div className="alert">
                    <Alert severity="success"><strong>Mensagem foi enviada</strong></Alert>
                </div>
            }

            <Button onClick={sendMessage} className="mt-2" variant="contained" endIcon={<SendIcon />}>
                Enviar
            </Button>

            {message.map((content) => {
                return (
                    <Grid container className={classes.root} xs={3}>
                        <div className="card mt-2" key={content.id}>
                            <div className="card-body">
                                <h5 className="card-title">{content.email}</h5>
                                <p className="card-text">{content.message}</p>
                                <p className="card-text"><small className="text-muted">{content.created_at}</small></p>
                            </div>
                        </div>
                    </Grid>
                )
            })}
        </>
    )
}

export default Contatos;

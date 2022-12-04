import Head from 'next/head';
import { useState } from 'react';
import styles from './index.module.css';

export default function Home() {
    const [imgInput, setImgInput] = useState('');
    const [result, setResult] = useState();

    async function onSubmit(event) {
        event.preventDefault();
        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ img: imgInput }),
        });
        const data = await response.json();

        setResult(data.image_url);

        setImgInput('');
    }

    return (
        <div>
            <Head>
                <title>OpenAI Quickstart</title>
                <link rel="icon" href="/dog.png" />
            </Head>

            <main className={styles.main}>
                <img src="/dog.png" className={styles.icon} />
                <h3>Generador de imagen con IA</h3>
                <form onSubmit={onSubmit}>
                    <input
                        type="text"
                        name="img"
                        placeholder="ingrese una descripción"
                        value={imgInput}
                        onChange={(e) => setImgInput(e.target.value)}
                    />
                    <input type="submit" value="Generar img" />
                </form>
                <div className={styles.result}>
                    <img className="imgClass" src={result} />
                </div>
            </main>
        </div>
    );
}

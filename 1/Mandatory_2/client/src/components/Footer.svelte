<script>
    export let name = 'NFT Afficionado';
    export let author = 'Paul Capatina-Voila';
</script>

<footer>
    <div class="footer-content">
        <h1>Hello, {name}!</h1>
        <p>Dont't miss your chance of making profit from the NFT's you bought here by making your own online shop!</p>
        <p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
        <code>©️ 2022 {author} - MIT</code>
    </div>
    <div class="footer-bg"></div>
</footer>

<style>
    @keyframes rainbow {
        0% {
            background-color: rgb(0, 0, 0);
            color: rgb(255, 255, 255);
        }
        10% {
            background-color: rgb(0, 0, 139);
            color: rgb(255, 140, 0);
        }
        20% {
            background-color: rgb(139, 0, 139);
            color: rgb(255, 255, 0);
        }
        30% {
            background-color: rgb(100, 148, 237);
            color: rgb(255, 248, 220);
        }
        40% {
            background-color: rgb(128, 255, 0);
            color: rgb(165, 42, 42);
        }
        50% {
            background-color: rgb(255, 105, 180);
            color: rgb(0, 0, 139);
        }
        100% {
            background-color: rgb(255, 255, 255);
            color: rgb(0, 0, 0);
        }
    }

    .footer-content {
        width: 100%;
        margin: 0.2em auto;
        padding: 1em;
        justify-self: center;
        align-self: center;
        text-align: center;
        color: green;
        background-color: rgba(211, 211, 211, 0.9);
        border: 0.2em solid black;
        border-radius: 1em;
        z-index: 1;
    }

    .footer-content p,
    .footer-content code {
        font-size: 1.2em;
        font-weight: bold;
    }

    .footer-content:hover {
        animation: rainbow 2s linear 0s infinite alternate-reverse none;
    }

    .footer-bg {
        position: absolute;
        width: 100vw;
        height: 100%;
        bottom: 0;
        background-image: url('../brand.png');
        background-repeat: repeat;
        filter: blur(0.3em);
        z-index: 0;
    }
</style>

import App from './App.svelte'

const app = new App( {
    target: document.body,
    props: {
        title: 'KEA Shop',
        name: 'KEA Shop Guest!'
    }
} )

export default app

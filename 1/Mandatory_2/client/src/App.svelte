<script>
    export let name;
    export let title;

    import Navigation from './Navigation.svelte';
    import Link from './Link.svelte';
    import Input from './Input.svelte';
    import Slideshow from './Slideshow.svelte';

    function generateUUID() {
        return 'xxxx-xxxx'.replace(/[x]/g, function (c) {
            var r = (Math.random() * 16) | 0,
                v = c == 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    }
</script>

<svelte:head>
    <title>{title}</title>
</svelte:head>

<body>
    <Navigation>
        <Link href="/" slot="brand">KEA NFT Shop</Link>
        <Link href="/" slot="products">Products</Link>
        <Link href="/" slot="locations">Locations</Link>
        <Link href="/" slot="cart">Cart</Link>
        <Link href="/" slot="account">Account</Link>
    </Navigation>

    <main>
        <Link href="/" />
        <Slideshow />
        <Input uuid="{generateUUID()}" label="label1" />
        <Input uuid="{generateUUID()}" label="label2" />
        <h1>Hello {name}!</h1>
        <p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
    </main>
</body>

<style>
    main {
        text-align: center;
        padding: 1em;
        max-width: 240px;
        margin: 0 auto;
    }

    h1 {
        color: #ff3e00;
        text-transform: uppercase;
        font-size: 4em;
        font-weight: 100;
    }

    @media (min-width: 640px) {
        main {
            max-width: none;
        }
    }
</style>

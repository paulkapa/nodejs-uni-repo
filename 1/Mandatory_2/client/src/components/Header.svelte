<script>
    import { slide } from 'svelte/transition';
    export let extendable = true;
    $: extended = false;
</script>

<header>
    <div class="header-bg"></div>
    <div class="header-content">
        <div class="brand-container">
            <span class="brand-svg"><em class="fa-solid fa-tags"></em></span>
            <span class="brand"><slot name="brand">Brand</slot></span>
        </div>
        <nav>
            <span class="nav-item products"><slot name="products">Products</slot></span>
            <span class="nav-item locations"><slot name="locations">Locations</slot></span>
            <span class="nav-item cart"><slot name="cart">Cart</slot></span>
            <span class="nav-item account"><slot name="account">Account</slot></span>
        </nav>
    </div>
</header>
{#if extendable}
    <span class="toggler" on:click="{() => (extended = !extended)}">
        {#if extended}
            <span class="toggle-close"><em class="fa-regular fa-square-caret-up"></em></span>
        {:else}
            <span class="toggle-open"><em class="fa-regular fa-square-caret-down"></em></span>
        {/if}
    </span>
    <section class="external-content-container">
        {#if extended}
            <span class="external-content" transition:slide><slot name="external-content">External Content</slot></span>
        {/if}
    </section>
{/if}

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

    header {
        font-size: 1.5em;
    }

    .header-bg {
        position: absolute;
        width: 100vw;
        height: 100%;
        bottom: 0;
        background-image: url('../brand.png');
        background-repeat: repeat;
        filter: blur(0.3em);
        z-index: 0;
    }

    .header-content {
        width: fit-content;
        margin: 0.2em auto;
        padding: 1em;
        justify-self: center;
        align-self: center;
        color: green;
        background-color: rgba(211, 211, 211, 0.9);
        border: 0.2em solid black;
        border-radius: 1em;
        animation: rainbow 5s linear 0s infinite alternate-reverse none;
        z-index: 1;
    }

    .header-content:hover {
        animation: none;
    }

    .brand-container {
        width: 100%;
        margin: 1em auto;
    }

    nav {
        display: flex;
    }

    .toggler {
        display: flex;
        position: relative;
        width: fit-content;
        margin: 0 1em;
        font-size: 2em;
    }

    .toggle-close:hover {
        color: chocolate;
    }

    .toggle-open:hover {
        color: forestgreen;
    }

    .external-content-container {
        border-bottom: 0.1em solid black;
    }
</style>

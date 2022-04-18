<script>
    import { slide } from 'svelte/transition';
    export let current_page;
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
    <div class="site-navigation"><slot name="site-navigation" /></div>
</header>
{#if current_page == 'products'}
    <section class="external-content-container">
        {#if extended}
            <span class="toggle-close" on:click="{() => (extended = !extended)}"><em class="fa-regular fa-square-caret-up"></em></span>
        {:else}
            <span class="toggle-open" on:click="{() => (extended = !extended)}"><em class="fa-regular fa-square-caret-down"></em></span>
        {/if}
        {#if extended}
            <span class="external-content" transition:slide><slot name="external-content">External Content</slot></span>
        {/if}
    </section>
{:else}
    <div class="border"></div>
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

    header,
    .external-content-container,
    .toggle-close,
    .toggle-open {
        font-size: 1.5em;
    }

    .header-content,
    .external-content-container,
    .border {
        border-bottom: 0.1em solid black;
    }

    .toggle-close,
    .toggle-open,
    .external-content {
        margin: 0 auto;
    }

    .toggle-close:hover {
        color: chocolate;
    }

    .toggle-open:hover {
        color: forestgreen;
    }

    .header-bg {
        position: absolute;
        width: 100vw;
        height: 100%;
        background-image: url('../brand.png');
        background-repeat: round;
        filter: blur(0.3em);
        z-index: 0;
    }

    .header-content {
        position: relative;
        height: 100%;
        margin: 0 auto;
        padding: 1em;
        color: green;
        border-radius: 1em;
        animation: rainbow 10s linear 0s infinite alternate-reverse none;
        z-index: 1;
    }

    .header-content:hover {
        animation: none;
    }

    .brand-container {
        position: relative;
        margin: 0 auto;
        padding: 1em;
    }

    .brand:hover {
        filter: drop-shadow(0 0 1em yellow);
        transition: 500ms;
    }

    nav {
        display: flex;
    }
</style>

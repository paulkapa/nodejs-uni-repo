<script>
    import { fly } from 'svelte/transition';
    let extended = false;
</script>

<header>
    <legend class="brand">
        <span>
            <em class="fa-solid fa-tags"></em>
        </span>
        <slot name="brand">Brand</slot>
    </legend>

    <nav>
        <span class="nav-item">
            <slot name="products">Products</slot>
        </span>
        <span class="nav-item">
            <slot name="locations">Locations</slot>
        </span>
        <span class="nav-item">
            <slot name="cart">Cart</slot>
        </span>
        <span class="nav-item">
            <slot name="account">Account</slot>
        </span>
    </nav>

    <section class="toggler">
        <span
            on:click="{() => {
                extended = !extended;
            }}"
        >
            {#if extended}
                <span>
                    <em class="fa-regular fa-square-caret-up"></em>
                </span>
            {:else}
                <span>
                    <em class="fa-regular fa-square-caret-down"></em>
                </span>
            {/if}
        </span>
    </section>
</header>

<section class="external-content">
    {#if extended}
        <div transition:fly>
            <slot name="external-content">External Content</slot>
        </div>
    {/if}
</section>

<style>
    header,
    nav,
    .external-content {
        position: relative;
        width: 100%;
        margin: 0 auto;
        padding: 0;
        text-align: center;
    }

    header {
        text-align: center;
    }

    nav {
        text-align: right;
    }

    .external-content {
        border: 0.3em solid rgba(112, 128, 144, 0);
        border-bottom-color: rgba(112, 128, 144, 0.5);
        border-style: outset;
    }

    .brand {
        padding: 1em;
        font-size: 2em;
        font-weight: 900;
        text-align: left;
    }

    .toggler {
        padding: 0.2em;
        font-size: 1.5em;
        font-weight: 900;
        text-align: left;
    }

    .toggler:hover {
        color: rgba(105, 90, 205, 0.9);
        transition: 200ms;
    }

    .nav-item {
        padding: 0.5em;
        font-size: 1.5em;
        font-weight: 500;
        text-align: center;
        border-radius: 0.2em 1em;
        background-color: rgba(112, 128, 144, 0.2);
    }

    .nav-item:hover {
        background-color: rgba(105, 90, 205, 0.3);
        transition: 200ms;
    }
</style>

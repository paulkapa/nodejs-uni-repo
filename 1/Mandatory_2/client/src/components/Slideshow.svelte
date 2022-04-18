<script>
    import { onMount } from 'svelte';
    import { blur } from 'svelte/transition';

    export let isTrimmed = false;
    export let await_nfts = [];
    export let nfts = [];

    $: display_width = 0;
    $: display = [];
    $: results = nfts.length;
    $: count = display_width <= 2000 ? Math.round(display_width / 400) : 10;
    $: max = count >= nfts.length ? nfts.length : count;
    $: animate = !(max >= nfts.length);
    $: interaction = false;

    function updateSize() {
        let first = display.at(0) || 0;
        let updated = new Array(max);
        updated.fill(-1, 0, max);
        updated.forEach((v, i, a) => {
            if (i == 0) a[i] = first;
            else {
                if (a[i - 1] + 1 >= nfts.length) a[i] = 0;
                else a[i] = a[i - 1] + 1;
            }
        });
        display = updated;
    }

    function forward() {
        if (animate) {
            display.forEach((v, i, a) => {
                v == nfts.length - 1 ? (a[i] = 0) : a[i]++;
            });
            display = display;
        }
    }
    function backward() {
        if (animate) {
            display.forEach((v, i, a) => {
                v == 0 ? (a[i] = nfts.length - 1) : a[i]--;
            });
            display = display;
        }
    }

    $: notification_alert = false;

    onMount(() => {
        setInterval(() => {
            updateSize();
        }, 1000);

        setInterval(() => {
            if (!interaction) forward();
        }, 2000);

        setInterval(() => {
            interaction = false;
        }, 10000);
    });
</script>

<section class="slideshow">
    <p class="results">Found {results} {results == 1 ? 'result' : 'results'}!</p>
    <div class="nfts" bind:clientWidth="{display_width}">
        {#await await_nfts}
            <span class="searching"><em class="fa-solid fa-brands fa-searchengin fa-beat-fade"></em></span>
        {:then result}
            {#if result}
                {#if !isTrimmed}
                    <div class="{notification_alert ? 'none' : 'notification'}">
                        Loaded {results}
                        {results == 1 ? 'Item' : 'Items'}!
                        <span
                            class="close-notification"
                            on:click="{() => {
                                notification_alert = true;
                            }}"><em class="fa-solid fa-x"></em></span
                        >
                    </div>
                    {#each display as i (i)}
                        <div in:blur="{{ duration: 1000 }}" class="nft">
                            <label class="label-visible" for="{nfts[i].slug}">
                                {(nfts[i].slug + ' NFT').replace(/-/g, ' ').replace(/\w\S*/g, (word) => word.replace(/^\w/, (character) => character.toUpperCase()))}
                            </label>
                            <code id="{nfts[i].slug}">{nfts[i].character}</code>
                            <label class="label-true" for="{nfts[i].slug}" hidden>{nfts[i].slug}</label>
                        </div>
                    {/each}
                {/if}
            {:else}
                <p class="fallback">No results found... Try being more specific!</p>
            {/if}
        {:catch}
            <p class="fallback">Problem encountered... Please reload the page!</p>
        {/await}
    </div>
    {#if !isTrimmed}
        <div class="controls" class:invisible="{!animate}">
            <span
                on:click="{() => {
                    backward();
                    interaction = true;
                }}"><em class="backward fa-solid fa-caret-left"></em></span
            >
            <span
                on:click="{() => {
                    forward();
                    interaction = true;
                }}"><em class="forward fa-solid fa-caret-right"></em></span
            >
        </div>
    {/if}
</section>

<style>
    .slideshow {
        text-align: center;
        justify-content: center;
    }

    .results {
        font-size: 1.2em;
        font-weight: 600;
    }

    .nfts,
    .nft {
        position: relative;
        display: flex;

        justify-content: center;
        align-content: space-between;
    }

    .nfts {
        flex-flow: row nowrap;
        min-height: 20em;

        overflow: hidden;
        border: 0.5em solid rgba(0, 100, 0, 0.3);
        border-radius: 0.5em;
        background-color: rgba(105, 90, 205, 0.3);
    }

    .searching,
    code {
        font-size: 10em;
    }

    .nft {
        flex-flow: column nowrap;
        margin: 0.5em;
        padding: 0.5em;

        border: 0.5em solid darkblue;
        border-radius: 0.5em;
        background-color: white;
    }

    .label-visible {
        width: 100%;
    }

    .label-true {
        display: none;
    }

    .fallback {
        color: darkgoldenrod;
        font-weight: 700;
    }

    .controls {
        justify-self: center;
        align-self: center;
        color: cadetblue;
        font-size: 5em;
    }

    .backward:hover,
    .forward:hover {
        color: aqua;
        cursor: pointer;
    }

    .invisible {
        visibility: hidden;
    }

    .none {
        display: none;
    }

    .notification {
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        padding: 0.5em;
        color: white;
        border: 0.1em solid blue;
        border-radius: 1em 0.3em;
        background-color: green;
        z-index: 100;
    }

    .close-notification {
        position: relative;
        z-index: inherit;
    }
</style>

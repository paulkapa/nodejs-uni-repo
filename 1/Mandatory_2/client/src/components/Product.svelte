<script>
    export let nft;
    export let i;
</script>

<section class="product">
    <div class="column1"><code class="value">{nft.character}</code></div>
    <div class="column2">
        <p class="name">{nft.slug}</p>
        <p class="price">{i} Money</p>
        <p class="stock">{i} {i == 1 ? 'Item' : 'Items'} in stock</p>
        <p class="description">The {nft.slug} NFT is an {i % 4 == 0 ? 'admirable' : 'important'} piece to add to your collection!</p>
    </div>
</section>

<style>
    .product {
        width: 100%;
        flex-flow: row nowrap;
        background-color: thistle;
    }
    .column1,
    .column2 {
        flex-flow: column nowrap;
    }

    .value {
        font-size: 12em;
        border: 0.1em solid white;
        border-radius: 0.9em;
    }

    .name {
        font-size: 2em;
    }

    .price,
    .description {
        font-size: 1.5em;
    }

    .stock {
        font-size: 1em;
    }
</style>

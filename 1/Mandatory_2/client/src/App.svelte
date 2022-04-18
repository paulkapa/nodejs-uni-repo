<script>
    import { onMount } from 'svelte';
    import Header from './components/Header.svelte';
    import Footer from './components/Footer.svelte';
    import Slideshow from './components/Slideshow.svelte';
    import Products from './components/Products.svelte';
    import Locations from './components/Locations.svelte';
    import Cart from './components/Cart.svelte';
    import Account from './components/Account.svelte';

    export let title;
    const session = 'valid_session';
    let nfts_endpoints = {
        base: `${window.location.protocol}//${window.location.host}/api/nft`,
        getAll: `/all?session=${session}`,
        getOne: `?emoji_name=%%PARAM%%&session=${session}`,
        search: `/search?search_string=%%PARAM%%&session=${session}`,
        getCategories: `/categories?session=${session}`,
        getCategory: `/category?category_name=%%PARAM%%&session=${session}`,
    };
    let platform_endpoints = {
        base: `${window.location.protocol}//${window.location.host}/api/platform?session=${session}&table=%%TABLE%%`,
        account: {
            INSERT: '&action=INSERT&email=%%EMAIL%%&password=%%PASSWORD%%',
            SELECT_ID: '&action=SELECT_ID&id=%%ID%%',
            SELECT_ALL: '&action=SELECT_ALL',
            SELECT_EMAIL: '&action=SELECT_EMAIL&email=%%EMAIL%%',
            UPDATE_EMAIL: '&action=UPDATE_EMAIL&new_email=%%NEW_EMAIL%%&email=%%EMAIL%%',
            UPDATE_PASSWORD: '&action=UPDATE_PASSWORD&new_password=%%NEW_PASSWORD%%&email=%%EMAIL%%',
            DELETE: '&action=DELETE&email=%%EMAIL%%',
        },
        session: {
            INSERT: '&action=INSERT&session=%%SESSION%%&data=%%DATA%%',
            SELECT_ID: '&action=SELECT_ID&id=%%ID%%',
            SELECT_ALL: '&action=SELECT_ALL',
            SELECT_SESSION: '&action=SELECT_SESSION&session=%%SESSION%%',
            UPDATE_DATA: '&action=UPDATE_DATA&data=%%DATA%%&session=%%SESSION%%',
            DELETE: '&action=DELETE&session=%%SESSION%%',
        },
        account_session: {
            INSERT: '&action=INSERT&account_id=%%ACCOUNT_ID%%&session_id=%%SESSION_ID%%',
            SELECT_ID: '&action=SELECT_ID&id=%%ID%%',
            SELECT_ALL: '&action=SELECT_ALL',
            SELECT_ACCOUNT: '&action=SELECT_ACCOUNT&account_id=%%ACCOUNT_ID%%',
            SELECT_SESSION: '&action=SELECT_SESSION&session_id=%%SESSION_ID%%',
        },
        order: {
            INSERT: '&action=INSERT&account_session_id=%%ACCOUNT_SESSION_ID%%&price=%%PRICE%%&is_placed=%%IS_PLACED%%&is_fulfilled=%%IS_FULFILLED%%',
            SELECT_ID: '&action=SELECT_ID&id=%%ID%%',
            SELECT_ALL: '&action=SELECT_ALL',
            SELECT_ACCOUNT_SESSION_ID: '&action=SELECT_ACCOUNT_SESSION_ID&account_session_id=%%ACCOUNT_SESSION_ID%%',
            UPDATE_IS_PLACED: '&action=UPDATE_IS_PLACED&is_placed=%%IS_PLACED%%&id=%%ID%%',
            UPDATE_IS_FULFILLED: '&action=UPDATE_IS_FULFILLED&is_fulfilled=%%IS_FULFILLED%%&id=%%ID%%',
        },
        order_item: {
            INSERT: '&action=INSERT&order_id=%%ORDER_ID%%&item_id=%%ITEM_ID%%&count=%%COUNT%%',
            SELECT_ID: '&action=SELECT_ID&id=%%ID%%',
            SELECT_ALL: '&action=SELECT_ALL',
            SELECT_ORDER_ID: '&action=SELECT_ORDER_ID&order_id=%%ORDER_ID%%',
            SELECT_ITEM_ID: '&action=SELECT_ITEM_ID&item_id=%%ITEM_ID%%',
            UPDATE_COUNT: '&action=UPDATE_COUNT&count=%%COUNT%%&id=%%ID%%',
            DELETE: '&action=DELETE&item_id=%%ITEM_ID%%',
        },
        items: {
            INSERT: '&action=INSERT&item=%%ITEM%%&value=%%VALUE%%&price=%%PRICE%%&stock=%%STOCK%%',
            SELECT_ID: '&action=SELECT_ID&id=%%ID%%',
            SELECT_ALL: '&action=SELECT_ALL',
            SELECT_ITEM: '&action=SELECT_ITEM&item=%%ITEM%%',
            UPDATE: '&action=UPDATE&stock=%%STOCK%%&price=%%PRICE%%&item=%%ITEM%%',
            DELETE: '&action=DELETE&item=%%ITEM%%',
        },
    };

    $: home = true;
    $: extendable = !home;
    $: slideshow_ready = false;

    $: products = false;

    $: locations = false;

    $: cart = false;

    $: account = false;

    $: search_string = '';
    $: categories = [];
    $: nfts = [];
    $: platform = [];

    function getRandomNumber(min, max) {
        return Math.round(min + Math.random() * (max - min));
    }

    function goToPage(page) {
        console.log('go to page ' + page);
        home = false;
        products = false;
        locations = false;
        cart = false;
        account = false;
        switch (page) {
            case 'home': {
                home = true;
                break;
            }
            case 'products': {
                products = true;
                break;
            }
            case 'locations': {
                locations = true;
                break;
            }
            case 'cart': {
                cart = true;
                break;
            }
            case 'account': {
                account = true;
                break;
            }
            default: {
                home = true;
                break;
            }
        }
    }

    /**
     * Repository function for NFT's.
     * @param {string} action
     * @param {string} parameter
     * @returns {} requested NFT's
     */
    async function nftRepository(action, parameter) {
        let endpoint = `${nfts_endpoints.base}${nfts_endpoints[action].replace('%%PARAM%%', parameter)}`;
        const response = await fetch(endpoint);
        const data = await response.json();
        if ('getAll getOne search getCategory'.includes(action)) {
            nfts = data.nft;
            return nfts;
        } else if ('getCategories'.includes(action)) {
            categories = data.nft;
            return categories;
        } else {
            return data.nft;
        }
    }

    /**
     *
     * @param params
     */
    async function platformRepository(params) {
        let endpoint = `${platform_endpoints.base.replace('%%TABLE%%', params.table)}`;
        let action = `${platform_endpoints[params.table][params.action]}`;
        for (let i = 0; i < params.fields.length; i++) action.replace(params.fields[i].name, params.fields[i].value);
        let sql = `${endpoint}${action}`;
        const response = await fetch(sql);
        const data = await response.json();
        if (params.action.includes('SELECT')) {
            platform = data.platform;
            return platform;
        } else {
            return data.platform;
        }
    }

    onMount(async () => {
        goToPage('home');
        const fecth_categories = await nftRepository('getCategories', '');
        const randomCategory = categories[getRandomNumber(0, categories.length - 1)].slug;
        search_string = randomCategory;
        slideshow_ready = true;

        const fetch_users = await platformRepository({ table: 'account', action: 'SELECT_ALL', fields: [] });
        console.log(fetch_users);
        console.log(platform);
    });
</script>

<svelte:head>
    <title>{title}</title>
</svelte:head>

<Header extendable="{extendable}">
    <button type="button" slot="brand" on:click="{() => goToPage('home')}">KEA NFT Shop</button>
    <button type="button" slot="products" on:click="{() => goToPage('products')}">Products</button>
    <button type="button" slot="locations" on:click="{() => goToPage('locations')}">Locations</button>
    <button type="button" slot="cart" on:click="{() => goToPage('cart')}">Cart</button>
    <button type="button" slot="account" on:click="{() => goToPage('account')}">Account</button>
    <div slot="external-content">This is external content</div>
</Header>

<section class="main">
    <h1>Explore the NFT<button type="button" on:click="{() => goToPage('products')}"><code>.collection</code></button>!</h1>
    {#if products}
        <section>
            <Products />
        </section>
    {/if}
    {#if locations}
        <section>
            <Locations />
        </section>
    {/if}
    {#if cart}
        <section>
            <Cart />
        </section>
    {/if}
    {#if account}
        <section>
            <Account />
        </section>
    {/if}
    {#if home}
        <section>
            {#if slideshow_ready}
                <div class="input-group">
                    <label for="explore">Choose a category:</label>
                    <select id="explore" name="search_string" default="{search_string}" bind:value="{search_string}">
                        {#each categories as category, i (i)}
                            <option value="{category.slug}">{category.slug}</option>
                        {/each}
                    </select>
                </div>
                <Slideshow await_nfts="{nftRepository('getCategory', search_string || '')}" nfts="{nfts || new Array(0)}" />
            {/if}
        </section>
        <h2>Check out our stores and contact info!</h2>
        <section>
            <p>
                KEA NFT Shop offers plenty of means to get support. You may come at any of the physical <button type="button" on:click="{() => goToPage('locations')}"
                    ><code>locations...</code></button
                >
                or you may use the contact information on this site.
            </p>
        </section>
    {/if}
</section>

<Footer />

<style>
    .input-group {
        width: 100%;
        position: relative;
        justify-content: center;
        align-content: center;
        justify-self: center;
        align-self: center;
    }

    .input-group label {
        color: darkcyan;
        font-size: 2em;
        font-weight: 700;
        text-align: center;
    }

    .input-group select {
        color: darkgoldenrod;
        font-size: 1.2em;
        border: unset;
        border: 0.2em solid lightskyblue;
    }

    p {
        padding: 1.2em;
        font-weight: bold;
    }
</style>

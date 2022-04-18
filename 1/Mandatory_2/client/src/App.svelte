<script>
    import { onMount } from 'svelte';
    import Header from './components/Header.svelte';
    import Footer from './components/Footer.svelte';
    import Slideshow from './components/Slideshow.svelte';
    import Product from './components/Product.svelte';
    import Locations from './components/Locations.svelte';

    export let title;
    let session = 'valid_session';
    let account = null;
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
    $: active_pages = {
        current_page: 'home',
        previous_page: '',
        home: true,
        products: false,
        product: false,
        locations: false,
        cart: false,
        account: false,
    };
    $: slideshow_ready = false;
    $: search_string = '';
    $: categories = [];
    $: nfts = [];
    $: platform = [];

    $: product_view = nfts.length == 1;
    $: products_per_page = product_view ? 1 : 0.01 * nfts.length >= 25 ? 25 : Math.round(0.01 * nfts.length);
    $: page_number = Math.round(nfts.length / products_per_page) - 1;
    $: curr_page = 0;
    $: one_product_index = 0;

    $: log_in_email = '';
    $: log_in_password = '';
    $: logedin = false;

    function login() {
        logedin = log_in_email == platform[0][0].email && log_in_password == platform[0][0].password;
    }

    function getRandomNumber(min, max) {
        return Math.round(min + Math.random() * (max - min));
    }

    function resolvePages() {
        active_pages.home = active_pages.current_page == 'home';
        active_pages.products = active_pages.current_page == 'products';
        active_pages.product = active_pages.current_page == 'product';
        active_pages.locations = active_pages.current_page == 'locations';
        active_pages.cart = active_pages.current_page == 'cart';
        active_pages.account = active_pages.current_page == 'account';
        active_pages.current_page == 'products' ? (active_pages.products = true) : null;
        active_pages = active_pages;
    }

    function goToPage(page) {
        active_pages.previous_page = active_pages.current_page;
        active_pages[active_pages.previous_page] = false;
        active_pages.current_page = page;
        active_pages[active_pages.current_page] = true;
        active_pages = active_pages;
        resolvePages();
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
        console.log(fetch_users[0][0]);
    });
</script>

<svelte:head>
    <title>{title}</title>
</svelte:head>

<Header current_page="{active_pages.current_page}">
    <button type="button" slot="brand" on:click="{() => goToPage('home')}">KEA NFT Shop</button>
    <button type="button" slot="products" on:click="{() => goToPage('products')}">Products</button>
    <button type="button" slot="locations" on:click="{() => goToPage('locations')}">Contact</button>
    <button type="button" slot="cart" on:click="{() => goToPage('cart')}">Cart</button>
    <button type="button" slot="account" on:click="{() => goToPage('account')}">Account</button>
    <div slot="external-content">
        <section>
            {#if slideshow_ready}
                <div class="input-group">
                    <label for="explore">Choose a category:</label>
                    <select id="explore" name="search_string" default="{search_string}" bind:value="{search_string}">
                        {#each categories as category, i (i)}
                            {#if category.slug != 'component'}
                                <option value="{category.slug}">{category.slug}</option>
                            {/if}
                        {/each}
                    </select>
                </div>
                <p class="results">Found {nfts.length} {nfts.length == 1 ? 'result' : 'results'}!</p>
            {/if}
        </section>
    </div>
</Header>

<section class="main">
    <h1>Explore the NFT<button type="button" on:click="{() => goToPage('products')}"><code>.collection</code></button>!</h1>
    {#if active_pages.product && session == 'valid_session'}
        <section class="product-view"><Product nft="{nfts[one_product_index]}" i="{one_product_index}" /></section>
    {/if}
    {#if active_pages.products && session == 'valid_session'}
        <section class="products">
            <section class="controls">
                <span class="previous" on:click="{() => (curr_page == 0 ? (curr_page = page_number) : (curr_page = curr_page - 1))}"
                    ><em class="fa-solid fa-arrow-left"></em></span
                >
                <span><code>{curr_page}/{page_number} ({nfts.length} NFT's)</code></span>
                <span class="next" on:click="{() => (curr_page == page_number ? (curr_page = 0) : (curr_page = curr_page + 1))}"><em class="fa-solid fa-arrow-right"></em></span>
            </section>
            {#each nfts as nft, i (i)}
                {#if i >= curr_page * products_per_page && i < (curr_page + 1) * products_per_page}
                    <button
                        type="button"
                        on:click="{() => {
                            one_product_index = i;
                            goToPage('product');
                        }}"><Product nft="{nft}" i="{i}" /></button
                    >
                {/if}
            {/each}
        </section>
        <section class="controls">
            <span
                class="previous"
                on:click="{() => {
                    curr_page == 0 ? (curr_page = page_number) : (curr_page = curr_page - 1);
                    window.scrollTo(0, 0);
                }}"><em class="fa-solid fa-arrow-left"></em></span
            >
            <span><code>{curr_page}/{page_number} ({nfts.length} NFT's)</code></span>
            <span
                class="next"
                on:click="{() => {
                    curr_page == page_number ? (curr_page = 0) : (curr_page = curr_page + 1);
                    window.scrollTo(0, 0);
                }}"><em class="fa-solid fa-arrow-right"></em></span
            >
        </section>
    {/if}
    {#if active_pages.locations}
        <section>
            <Locations />
        </section>
    {/if}
    {#if session == 'valid_session'}
        {#if active_pages.cart}
            <section></section>
        {/if}
        {#if active_pages.account}
            <section></section>
        {/if}
        {#if active_pages.home || active_pages.products}
            <section>
                {#if slideshow_ready}
                    <div class="input-group">
                        <label for="explore">Choose a category:</label>
                        <select id="explore" name="search_string" default="{search_string}" bind:value="{search_string}">
                            {#each categories as category, i (i)}
                                {#if category.slug != 'component'}
                                    <option value="{category.slug}">{category.slug}</option>
                                {/if}
                            {/each}
                        </select>
                    </div>
                    <Slideshow await_nfts="{nftRepository('getCategory', search_string || '')}" nfts="{nfts || new Array(0)}" />
                {/if}
            </section>
            <h2>Check out our stores and contact info!</h2>
            <section>
                <p>
                    KEA NFT Shop offers plenty of means to get support. You may come at any of the established <button type="button" on:click="{() => goToPage('locations')}"
                        ><code>locations...</code></button
                    >
                    or you may use the contact information found on this site.
                </p>
            </section>
        {/if}
    {/if}
    {#if active_pages.account}
        <section class="login">
            {#if !logedin}
                <p>Log In to view shop items</p>
                Details:
                <ul>
                    <li>Email: test@platform.com</li>
                    <li>Password: 1234</li>
                </ul>
                <div class="input-group">
                    <label for="email">Email</label>
                    <input type="text" id="email" name="email" bind:value="{log_in_email}" />
                </div>
                <div class="input-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" bind:value="{log_in_password}" />
                </div>
                <div>
                    <button
                        type="button"
                        on:click="{() => {
                            login();
                        }}">Log In</button
                    >
                </div>
            {/if}
            <div>
                {#if logedin}
                    <p style="color: green">Success!</p>
                    <div>
                        <p>Account: {platform[0][0].email}</p>
                        <p>Password: {'*'.repeat(platform[0][0].password.length)}</p>
                    </div>
                {:else}
                    <p style="color: yelloq">Checking details...</p>
                {/if}
            </div>
        </section>
    {/if}
</section>

<Footer current_page="{active_pages.current_page}" />

<style>
    .login {
        width: unset;
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-content: center;
    }

    .input-group {
        width: 100%;
        margin: 0 auto;
        position: relative;
        justify-self: center;
        align-self: center;
    }

    .input-group label {
        margin: 0;
        color: darkcyan;
        font-size: 2em;
        font-weight: 700;
        text-align: center;
    }

    .input-group select,
    .input-group input {
        margin: 0;
        color: darkgoldenrod;
        font-size: 1.2em;
        border: unset;
        border: 0.2em solid lightskyblue;
    }

    button {
        opacity: 0.8;
        padding: 0.2em;
        border-radius: 0.2em 1em;
    }

    p {
        padding: 1.2em;
        font-weight: bold;
    }

    .controls {
        display: flex;
        flex-flow: row nowrap;
    }

    .controls * {
        padding: 0.2em;
    }

    .product-view,
    .products {
        width: 100%;
    }
</style>

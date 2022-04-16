<script>
    export let href = '';
</script>

<a href="{href}">
    <slot>link</slot>
</a>

<style>
    a {
        text-decoration: none;
    }
</style>

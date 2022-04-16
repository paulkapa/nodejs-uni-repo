<script>
    export let alt;
    export let autocomplete;
    //export let autofocus; (svelte warning: avoid using autofocus)
    export let checked;
    export let disabled;
    export let form;
    export let max;
    export let min;
    export let maxlength;
    export let minlength;
    export let multiple;
    export let name;
    export let placeholder;
    export let readonly;
    export let required;
    export let step;
    export let type;
    export let value;

    export let label = 'Input';
    export let uuid = '';
</script>

<div class="input-group">
    {#if !'button hidden reset submit'.includes(type)}
        <label for="{uuid}">{label}</label>
    {/if}
    <input
        id="{uuid}"
        alt="{alt}"
        autocomplete="{autocomplete}"
        checked="{checked}"
        disabled="{disabled}"
        form="{form}"
        max="{max}"
        min="{min}"
        maxlength="{maxlength}"
        minlength="{minlength}"
        multiple="{multiple}"
        name="{name}"
        placeholder="{placeholder}"
        readonly="{readonly}"
        required="{required}"
        step="{step}"
        type="{type}"
        value="{value}"
    />
</div>

<style>
    .input-group {
        margin: 0 auto;
        margin-top: 0.2em;
        margin-bottom: 0.2em;
        padding: 0;
    }
</style>

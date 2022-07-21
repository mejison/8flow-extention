<template>
    <div class="welcome">
        <button class="btn btn-primary" @click="$emit('go-to', 'login')">Login</button>
        <button class="btn btn-primary" @click="$emit('go-to', 'register')">Register</button>
    </div>
</template>

<script>
export default {
    name: 'welcome',
}
</script>

<style>
    .welcome {
        display: flex;
        flex-direction: column;
        height: calc(100vh - 40px);
        justify-content: center;
    }

    .welcome .btn {
        margin-bottom: 15px;
    }
</style>
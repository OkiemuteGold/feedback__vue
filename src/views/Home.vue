<template>
    <div class="home">
        <UserLogin />
    </div>
</template>

<script>
import UserLogin from "./UserLogin.vue";

export default {
    name: "Home",
    components: {
        UserLogin,
    },
};
</script>

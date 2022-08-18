<template>
  
<div class="container">
<router-view/>
</div>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
        <a class="navbar-brand ms-5" href="#"><img src="/img/logo_teste.png" alt=""></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <!-- <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">          
                <router-link class="nav-link" to="/">Home</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" to="/admin">Admin</router-link>
            </li>
        </ul> -->
        </div>
    </div>
</nav>
</template>

<script>
export default {

}
</script>

<style scoped>
    img {
        width: 100px;
        border-radius: 50%;
    }
</style>
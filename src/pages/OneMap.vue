<template>
    <div class="onemap-page">
        <MapView />
        <MapTools />
        <MapTree />
        <XZQHComponent />
    </div>
</template>

<script>
// import MapView from './../components/MapView';
import MapView from '../components/MapView';
import MapTools from '../components/MapTools';
import MapTree from '../components/MapTree';
import XZQHComponent from './../components/XZQHComponent';
export default {
    name: 'OneMap',
    components: { MapView, MapTools, MapTree, XZQHComponent },
    methods: {},
};
</script>

<style scoped>
.onemap-page {
    position: relative;
    width: 100%;
    height: 100%;
}
</style>

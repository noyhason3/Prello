<template>
    <ul>
        <li v-for="activity in activities" :key="activity.id"> 
            {{activity.txt}}
        </li>
    </ul>
</template>

<script>
export default {
    props:{
        activities: Array
    }

}
</script>

<script setup lang="ts">
</script>

<template>
    <Suspense>
        <RouterView v-slot="{ Component }">
            <Transition
                enter-active-class="animate__animated animate__fadeIn"
                leave-active-class="animate__animated animate__fadeOut"
                mode="out-in"
            >
                <KeepAlive>
                    <component :is="Component" />
                </KeepAlive>
            </Transition>
        </RouterView>
    </Suspense>
</template>

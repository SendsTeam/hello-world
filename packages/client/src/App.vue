<script setup lang="ts">
import { NMessageProvider } from 'naive-ui'
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
                    <n-message-provider>
                        <component :is="Component" />
                    </n-message-provider>
                </KeepAlive>
            </Transition>
        </RouterView>
    </Suspense>
</template>

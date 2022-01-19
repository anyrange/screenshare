<script setup lang="ts">
  import { ref } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import { useFps } from "@vueuse/core";
  import { createPeer } from "@/peer";

  const fps = useFps();
  const router = useRouter();

  const video = ref();
  const isDestroyed = ref(false);

  const route = useRoute();
  const room = route.params.id as string;

  const peer = createPeer();

  const goHome = () => {
    router.push({
      name: "index",
    });
  };

  const destroyStream = () => {
    isDestroyed.value = true;
  };

  peer.on("open", () => {
    const conn = peer.connect(room);
    conn.on("close", () => {
      destroyStream();
    });
  });

  peer.on("call", (call) => {
    call.on("stream", (remoteStream) => {
      video.value.srcObject = remoteStream;
    });
    call.answer();
  });

  window.onbeforeunload = () => peer.destroy();
</script>

<template>
  <template v-if="isDestroyed">
    <div class="flex h-screen">
      <div class="m-auto text-center">
        <h1 class="font-semibold text-2xl mb-3">
          Stream ended or does not exist
        </h1>
        <button class="btn" @click="goHome">Go home</button>
      </div>
    </div>
  </template>
  <template v-else>
    <div class="relative w-screen h-screen">
      <div class="min-h-screen min-w-full">
        <video
          ref="video"
          class="aspect-video absolute h-full w-full border-2 border-blue-600"
          muted
          autoplay
          controls
        />
        <div class="absolute left-0 top-0">
          <p
            class="bg-gray-700-spotify px-2 py-0.5 font-mono text-xxs text-white"
          >
            fps: {{ fps }}; room id: {{ room }}
          </p>
        </div>
      </div>
    </div>
  </template>
</template>

<style>
  #outer {
    display: block;
    text-align: center;
    position: relative;
    overflow: hidden;
    min-height: 100%;
  }
  #home-top-video {
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }
  #home-text {
    left: 0%;
    top: 0;
    height: 100%;
    width: 100%;
    padding-top: 10%;
    overflow: hidden;
    position: absolute;
    z-index: 0;
    color: white;
  }
</style>

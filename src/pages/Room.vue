<script setup lang="ts">
  import { ref } from "vue";
  import { useRoute } from "vue-router";
  import { createPeer } from "@/peer";

  const video = ref();

  const route = useRoute();
  const room = route.params.id as string;

  const peer = createPeer();

  console.log(room);

  peer.on("open", () => peer.connect(room));

  peer.on("call", (call) => {
    call.on("stream", (remoteStream) => {
      video.value.srcObject = remoteStream;
    });
    call.answer();
  });

  // to do: call end error handling
</script>

<template>
  <div class="flex h-screen">
    <div class="m-auto">
      <div class="flex flex-col gap-2">
        <p class="text-xl text-center">
          Room id:
          <span class="font-bold"> {{ room }} </span>
        </p>
        <div class="flex w-full justify-center">
          <video
            ref="video"
            muted
            autoplay
            controls
            class="h-100 w-auto border-2 border-indigo-600"
          />
        </div>
      </div>
    </div>
  </div>
</template>

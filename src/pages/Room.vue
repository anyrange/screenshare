<script setup lang="ts">
  import { ref, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import { getId } from "../utils/";
  import { createPeer } from "../peer";

  const video = ref();

  const route = useRoute();
  const room = route.params.id as string;

  onMounted(async () => {
    const constraints = {
      video: true,
      audio: false,
    };

    const id = getId();
    const peer = createPeer(id);
    console.log(`id: ${id}, peer: ${peer}`);

    if (!room) {
      const stream = await navigator.mediaDevices
        .getDisplayMedia(constraints)
        .catch((error) => {
          console.error("Error accessing media devices.", error);
        });

      if (stream) peer.on("call", (call) => call.answer(stream));

      video.value.srcObject = stream;
    }

    if (room) {
      console.log(room);

      // kostyl'
      const stream = await navigator.mediaDevices.getDisplayMedia(constraints);
      //

      if (stream) {
        const call = peer.call(room, stream);
        call.on("stream", (remoteStream) => {
          video.value.srcObject = remoteStream;
        });
      }
    }
  });
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

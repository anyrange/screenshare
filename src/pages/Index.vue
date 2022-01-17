<script setup lang="ts">
  import { ref, watchEffect } from "vue";
  import { useRouter } from "vue-router";
  import { useDisplayMedia, useClipboard } from "@vueuse/core";
  import { maska as vMaska } from "maska";
  import { getId } from "@/utils";
  import { createPeer } from "@/peer";

  const router = useRouter();

  const video = ref();
  const roomId = ref("");

  const id = getId();
  const peer = createPeer(id);

  const { stream, enabled } = useDisplayMedia();
  const { isSupported, copy } = useClipboard();

  const join = () => {
    router.push({
      name: "room",
      params: {
        id: roomId.value,
      },
    });
  };

  watchEffect(() => {
    if (!video.value) return console.log("stop");

    video.value.srcObject = stream.value;
    peer.on("call", (call) => call.answer(stream.value));

    peer.on("connection", (conn) => {
      conn.on("open", () =>
        peer.call(conn.peer, stream.value || new MediaStream()),
      );
    });
  });
</script>

<template>
  <div class="flex flex-col gap-10 mt-20">
    <h1 class="text-center text-3xl">ScreenShare</h1>
    <div class="flex flex-row justify-center items-center gap-6">
      <div>
        <button class="btn" @click="enabled = !enabled">
          {{ enabled ? "Stop" : "Start" }} sharing my screen
        </button>
      </div>
      <span>or</span>
      <form class="flex gap-1" @submit.prevent="join">
        <label class="flex flex-col">
          <input
            v-model="roomId"
            v-maska="'######'"
            type="text"
            placeholder="Enter room id"
            class="input"
          />
        </label>
        <button class="btn" :disabled="!roomId" type="submit">Join</button>
      </form>
    </div>
    <template v-if="enabled">
      <div class="flex flex-col gap-2">
        <div class="flex flex-row items-center justify-center gap-2">
          <p class="text-xl">
            Room id:
            <span class="font-bold"> {{ id }} </span>
          </p>
          <template v-if="isSupported">
            <button class="btn" @click="copy(id)">Copy</button>
          </template>
        </div>
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
    </template>
  </div>
</template>

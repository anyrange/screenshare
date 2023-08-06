<script setup lang="ts">
  import { ref, watchEffect, watch, computed, reactive } from "vue";
  import { useRouter } from "vue-router";
  import { useDisplayMedia, useClipboard } from "@vueuse/core";
  import { maska as vMaska } from "maska";
  import { getId } from "@/utils";
  import { openChannel } from "@/peer";

  const router = useRouter();

  const video = ref();
  const roomId = ref("");

  const connectedPeers = reactive(new Set());
  const viewers = computed(() => connectedPeers.size);

  const id = getId();
  const channel = openChannel(id);

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

    channel.on("peerconnect", (peer) => {
      if (connectedPeers.has(peer.client_id)) return;

      connectedPeers.add(peer.client_id);

      if (!stream.value) return;
      peer.addStream(stream.value);
    });

    channel.start();

    channel.on("peerclose", (peer) => {
      connectedPeers.delete(peer.client_id);
    });
  });

  watch(enabled, (v) => {
    if (!v) {
      connectedPeers.clear();
      channel.destroy();
    }
  });

  window.onbeforeunload = () => channel.destroy();
</script>

<template>
  <div class="flex flex-col gap-10 mt-20">
    <h1 class="text-center text-3xl">ScreenShare</h1>
    <div class="flex flex-col md:flex-row justify-center items-center gap-6">
      <div>
        <button class="btn" @click="enabled = !enabled">
          {{ enabled ? "Stop" : "Start" }} sharing my screen
        </button>
      </div>
      <template v-if="!enabled">
        <span>or</span>
        <form class="flex flex-col sm:flex-row gap-1" @submit.prevent="join">
          <label class="flex flex-col">
            <input
              v-model="roomId"
              v-maska="'######'"
              type="text"
              placeholder="Enter room id"
              class="input"
            />
          </label>
          <button
            class="btn"
            :disabled="roomId.toString().length !== 6"
            type="submit"
          >
            Join
          </button>
        </form>
      </template>
    </div>
    <template v-if="enabled">
      <div class="flex flex-col gap-2">
        <div class="flex flex-row items-center justify-center gap-2">
          <p class="text-xl">
            Viewers:
            <span class="font-bold"> {{ viewers }} </span>
            <span> | </span>
            Room:
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
            class="h-100 w-auto border-2 border-red-600"
          />
        </div>
      </div>
    </template>
  </div>
</template>

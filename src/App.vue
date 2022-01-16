<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Peer from 'peerjs'

import { getId } from './utils/utils'
const id = getId()
console.log('id:', id)

const video = ref()

const urlSearchParams = new URLSearchParams(window.location.search)
const params = Object.fromEntries(urlSearchParams.entries())
const room = params.room

onMounted(async () => {
  const constraints = {
    video: true,
    audio: false,
  }

  const peer = new Peer(id, {
    host: 'localhost',
    port: 9000,
    path: '/peer',
  })

  console.log('peer:', peer)

  if (!room) {
    const stream = await navigator.mediaDevices
      .getDisplayMedia(constraints)
      .catch((error) => {
        console.error('Error accessing media devices.', error)
      })

    if (stream) peer.on('call', (call) => call.answer(stream))

    video.value.srcObject = stream
  }

  if (room) {
    console.log(room)

    // kostyl'
    const stream = await navigator.mediaDevices.getDisplayMedia(constraints)
    //

    if (stream) {
      const call = peer.call(room, stream)
      call.on('stream', (remoteStream) => {
        video.value.srcObject = remoteStream
      })
    }
  }
})
</script>

<template>
  {{ id }}
  <br />
  <video
    ref="video"
    autoPlay
    style="border: 1px solid #999; height: 80vh; width: 80vw"
  ></video>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

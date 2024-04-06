<script setup lang="ts">
import { onMounted, nextTick, ref } from 'vue';

import SyncVideoPlayer from './lib';

import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://peqfrnhcsuqybiidcpss.supabase.co'
const supabase = createClient(supabaseUrl, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBlcWZybmhjc3VxeWJpaWRjcHNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIwOTQzMjcsImV4cCI6MjAyNzY3MDMyN30.F6j2Yf20ZC5Hp1Ug7cSKvbWOuMXS_sQG5KbIw4YnUVo")

const video_url = ref('')
const video_played = ref(false)


const ids = ref(['video-0']);

const syncVideoPlayer = new SyncVideoPlayer({
  controls: false,
  loop: true,
  videoPlayers: [
    {
      id: '#video-0',
      controls: false,
      main: true,
      initialSrc: "https://peqfrnhcsuqybiidcpss.supabase.co/storage/v1/object/public/myfiles/12w12w1.mp4?t=2024-04-06T18%3A29%3A36.630Z",
    }
  ],
});

onMounted(() => {
  syncVideoPlayer.mount();
});

async function onPlay() {


  const { data, error } = await supabase
    .from('video_sync')
    .update({ played: true })
    .eq('id', '1')
    .select()

}

async function onPause() {


  const { data, error } = await supabase
    .from('video_sync')
    .update({ played: false })
    .eq('id', '1')
    .select()

}

const channels = supabase.channel('custom-update-channel')
  .on(
    'postgres_changes',
    { event: 'UPDATE', schema: 'public', table: 'video_sync' },
    async (payload) => {
      if (payload.new.played) {
        await syncVideoPlayer.play();
      }
      else {
        await syncVideoPlayer.pause();
      }
    }
  )
  .subscribe()

async function onClick(index: number) {
  syncVideoPlayer.swapVideo(0, index);
}

async function onChange(e: Event) {
  const value = (<HTMLInputElement>e.target).value;
  await syncVideoPlayer.timeTo(parseFloat(value));
}
</script>

<template>
  <div>
    <div class="container">
      <div v-for="(id, i) in ids" class="box" :id="id" :key="i" @click="onClick(i)">B</div>
    </div>

    <div class="controls">
      <button @click="onPlay">Play</button>
      <button @click="onPause">Pause</button>
      <div class="time">
        <input type="range" min="0" max="100" value="0" class="slider" id="myRange" @input="onChange">
      </div>

    </div>
  </div>
</template>


<style scoped lang="scss">
.box {
  min-width: 100%;
  height: 100%;
  padding: 8px;
  font-weight: bold;
  font-size: 17px;
  line-height: 24px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
}

.qqq {
  grid-area: aaa;
}

;

.www {
  grid-area: bbb;
}

;

.eee {
  grid-area: ccc;
}

;

.rrr {
  grid-area: ddd;
}

;
</style>

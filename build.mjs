import fs from 'node:fs/promises';
import path from 'node:path';
const root=process.cwd(),out=path.join(root,'dist'),audioDir=path.join(out,'audio');
await fs.rm(out,{recursive:true,force:true});
await fs.mkdir(audioDir,{recursive:true});
await fs.copyFile(path.join(root,'index.html'),path.join(out,'index.html'));

const stableBase='https://letmnguyet0112-max.github.io/Sp1-tham-tu-san-chu/audio/';
const existing=['intro.mp3','task1.mp3','task2.mp3','task3.mp3','task4.mp3','task5.mp3','task6.mp3','task7.mp3','task8.mp3','correct.mp3','retry.mp3','finish.mp3','success-jingle.mp3','retry-cue.mp3'];
for(const name of existing){
  const res=await fetch(stableBase+name);
  if(!res.ok) throw new Error('existing '+name+': '+res.status);
  await fs.writeFile(path.join(audioDir,name),Buffer.from(await res.arrayBuffer()));
}
const newAssets={'yeah.mp3':"https://dnznrvs05pmza.cloudfront.net/text_to_speech/5d9a7857-146d-4988-9133-7d891790fe80/SP1_Yeah_Dung_roi.mp3?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiNTU2NjA4NWEyMzk3NDU3NSIsImJ1Y2tldCI6InJ1bndheS10YXNrLWFydGlmYWN0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc5MDc5MTc3MH0.k0HbAsNrdvCDnwon5wgK3qtNSuKVBCCxFVHL18Zlkn0",'applause.mp3':"https://dnznrvs05pmza.cloudfront.net/audio_sfx/416e3a5d-79df-46b3-b81f-a6dd9086f8a1/SP1_Vo_tay_chuc_mung.mp3?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiZTM5NjkyMDgxYTdmM2E3ZSIsImJ1Y2tldCI6InJ1bndheS10YXNrLWFydGlmYWN0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc5MDc0NzAxNn0.Sj5Nh0XAX-z0ETe8OyvxfxjcLZ7zpf9yV8T58vDfWXk"};
for(const [name,url] of Object.entries(newAssets)){
  const res=await fetch(url);
  if(!res.ok) throw new Error('new '+name+': '+res.status);
  await fs.writeFile(path.join(audioDir,name),Buffer.from(await res.arrayBuffer()));
}
console.log('Built SP1 with '+(existing.length+Object.keys(newAssets).length)+' audio files.');

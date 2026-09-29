import fs from 'node:fs/promises';
import path from 'node:path';
const root=process.cwd(),out=path.join(root,'dist'),audioDir=path.join(out,'audio');
await fs.rm(out,{recursive:true,force:true});
await fs.mkdir(audioDir,{recursive:true});
await fs.copyFile(path.join(root,'index.html'),path.join(out,'index.html'));

const stableBase='https://letmnguyet0112-max.github.io/Sp1-tham-tu-san-chu/audio/';
const existing=['intro.mp3','task1.mp3','task2.mp3','task3.mp3','task4.mp3','task5.mp3','task6.mp3','task7.mp3','task8.mp3','correct.mp3','retry.mp3','finish.mp3','success-jingle.mp3','retry-cue.mp3','yeah.mp3','applause.mp3'];
for(const name of existing){
  const res=await fetch(stableBase+name);
  if(!res.ok) throw new Error('existing '+name+': '+res.status);
  await fs.writeFile(path.join(audioDir,name),Buffer.from(await res.arrayBuffer()));
}
const newAssets={'cheer.mp3':"https://dnznrvs05pmza.cloudfront.net/audio_sfx/0c4dc1d4-885e-4283-817f-e6d2f9be082b/SP1_Reo_ho_vo_tay_lon.mp3?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiZDQ5YWMzZjcwZDE5MDA3YSIsImJ1Y2tldCI6InJ1bndheS10YXNrLWFydGlmYWN0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc5MDc4NzcwM30.b3QqhqmFo0U9yvLUsYgxX2EVWvv_m2DKjRuXCNt6b8M"};
for(const [name,url] of Object.entries(newAssets)){
  const res=await fetch(url);
  if(!res.ok) throw new Error('new '+name+': '+res.status);
  await fs.writeFile(path.join(audioDir,name),Buffer.from(await res.arrayBuffer()));
}
console.log('Built SP1 with '+(existing.length+Object.keys(newAssets).length)+' audio files.');

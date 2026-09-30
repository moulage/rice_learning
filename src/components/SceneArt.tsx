interface SceneArtProps {
  sceneId: string;
  active?: boolean;
  priority?: boolean;
  className?: string;
}

interface SceneImage {
  file: string;
  alt: string;
  credit: string;
  source: string;
}

const sceneImages: Record<string, SceneImage> = {
  'scene-bell-tower': {
    file: 'bell-tower.jpg',
    alt: '西安钟楼实景照片',
    credit: 'David Castor · Public Domain',
    source: 'https://commons.wikimedia.org/wiki/File:Xi%27an_bell_tower.jpg',
  },
  'scene-drum-tower': {
    file: 'drum-tower.jpg',
    alt: '西安鼓楼实景照片',
    credit: 'xiquinhosilva · CC BY 2.0',
    source: 'https://commons.wikimedia.org/wiki/File:Drum_Tower_of_Xi%27an.jpg',
  },
  'scene-city-wall': {
    file: 'city-wall.jpg',
    alt: '西安城墙实景照片',
    credit: 'xiquinhosilva · CC BY 2.0',
    source: 'https://commons.wikimedia.org/wiki/File:City_wall_of_Xi%27an_51550-Xian_(27959363326).jpg',
  },
  'scene-big-wild-goose-pagoda': {
    file: 'big-wild-goose-pagoda.jpg',
    alt: '大雁塔实景照片',
    credit: '沈澄心 · CC0',
    source: 'https://commons.wikimedia.org/wiki/File:Giant_Wild_Goose_Pagoda_20240806_02.jpg',
  },
  'scene-small-wild-goose-pagoda': {
    file: 'small-wild-goose-pagoda.jpg',
    alt: '小雁塔实景照片',
    credit: 'Gary Todd · CC0',
    source: 'https://commons.wikimedia.org/wiki/File:Xiaoyan_Pagoda_(46737262584).jpg',
  },
  'scene-forest-of-stelae': {
    file: 'forest-of-stelae.jpg',
    alt: '西安碑林附近古建筑实景照片',
    credit: 'Kcx36 · CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:西安文庙-大成殿遗址.jpg',
  },
  'scene-grand-tang-mall': {
    file: 'grand-tang-mall.jpg',
    alt: '西安曲江唐文化街区实景照片',
    credit: 'Charlie fong冯成 · Public Domain',
    source: 'https://commons.wikimedia.org/wiki/File:XiAn_qujiang.jpg',
  },
  'scene-muslim-quarter': {
    file: 'muslim-quarter.jpg',
    alt: '西安回民街实景照片',
    credit: 'Batiste Pannetier · FAL',
    source: 'https://commons.wikimedia.org/wiki/File:Muslim_Quarter_Xi%27an_China.jpg',
  },
  'scene-shaanxi-history-museum': {
    file: 'shaanxi-history-museum.jpg',
    alt: '陕西历史博物馆实景照片',
    credit: 'Danielinblue(张之诚) · CC BY-SA 3.0',
    source: 'https://commons.wikimedia.org/wiki/File:Shaanxi_History_Museum_architecture.JPG',
  },
  'scene-xian-museum': {
    file: 'xian-museum.jpg',
    alt: '西安博物院小雁塔实景照片',
    credit: 'H2v5o68z · CC0',
    source: 'https://commons.wikimedia.org/wiki/File:Small_Wild_Goose_Pagoda_1.jpg',
  },
  'scene-metro-station': {
    file: 'metro-station.jpg',
    alt: '西安地铁站厅实景照片',
    credit: 'Bob Wehn · CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Concourse_of_GAOQIAO_Station,_Xi%27an_Metro_(May_19,_2023)_01.jpg',
  },
  'scene-city-park': {
    file: 'city-park.jpg',
    alt: '西安城市公园实景照片',
    credit: 'Shirkarni · CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Tang_Park_Xian_3054.jpg',
  },
  'scene-bookstore': {
    file: 'bookstore.jpg',
    alt: '儿童图书阅读区实景照片',
    credit: 'ProjectManhattan · CC BY-SA 3.0',
    source: 'https://commons.wikimedia.org/wiki/File:Children%27s_books_at_a_library.jpg',
  },
  'scene-market': {
    file: 'market.jpg',
    alt: '菜市场实景照片',
    credit: 'Rowingbohe · CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Yuhuan_Chengguan_Center_Vegetable_Market_in_April_2020.jpg',
  },
  'scene-school-gate': {
    file: 'school-gate.jpg',
    alt: '小学校门实景照片',
    credit: 'ZephyrChen · CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:The_main_entrance_of_Chung-Wen_Elementary_School_01.jpg',
  },
  'scene-sports-meeting': {
    file: 'sports-meeting.jpg',
    alt: '学校运动场跑道实景照片',
    credit: 'Petewarrior · CC BY 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Brillia_Running_Stadium_track.jpg',
  },
};

function appAsset(file: string): string {
  const base = import.meta.env.BASE_URL;
  const separator = base.endsWith('/') ? '' : '/';
  return `${base}${separator}images/scenes/${file}`;
}

export function SceneArt({
  sceneId,
  active = true,
  priority = false,
  className = '',
}: SceneArtProps) {
  const image = sceneImages[sceneId];

  if (!image) {
    return (
      <div className={`scene-art scene-fallback ${className}`} role="img" aria-label="长安学习地点">
        <span>长安地点</span>
      </div>
    );
  }

  return (
    <figure className={`scene-art ${active ? 'active' : 'muted'} ${className}`}>
      <img
        src={appAsset(image.file)}
        alt={image.alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
      />
      <figcaption>
        <a href={image.source} target="_blank" rel="noreferrer">
          {image.credit}
        </a>
      </figcaption>
    </figure>
  );
}

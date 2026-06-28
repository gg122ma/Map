import { create } from 'zustand';

export interface Memory {
  id: string;
  author: string;
  year: string;
  text: string;
  emoji: string;
  timestamp: number;
}

export interface Building {
  id: string;
  name: string;
  subtitle: string;
  position: [number, number, number];
  size: [number, number, number];
  color: string;
  roofColor: string;
  emoji: string;
  description: string;
  memories: Memory[];
}

interface CampusStore {
  buildings: Building[];
  selectedBuilding: Building | null;
  isZooming: boolean;
  showMemoryWall: boolean;
  setSelectedBuilding: (building: Building | null) => void;
  setIsZooming: (v: boolean) => void;
  setShowMemoryWall: (v: boolean) => void;
  addMemory: (buildingId: string, memory: Omit<Memory, 'id' | 'timestamp'>) => void;
}

const initialBuildings: Building[] = [
  {
    id: 'cafeteria',
    name: 'Cafeteria',
    subtitle: 'The Heart of Campus',
    position: [-4, 0, 2],
    size: [2.8, 1.2, 2.2],
    color: '#f97316',
    roofColor: '#ea580c',
    emoji: '🍜',
    description: 'Where friendships were forged over late-night suppers and morning teh tarik.',
    memories: [
      { id: '1', author: 'Amirah Z.', year: '2019', text: 'Every Friday nasi lemak with my roommates. Those mornings were golden. Miss you all! 💛', emoji: '🍛', timestamp: 1 },
      { id: '2', author: 'Raj K.', year: '2021', text: 'Finished my FYP proposal here at 2am. The aunty gave me free teh tarik. Legend.', emoji: '☕', timestamp: 2 },
      { id: '3', author: 'Linh T.', year: '2020', text: 'First day orientation, I sat alone here. A stranger sat across and said "Mind if I join?" — that stranger is now my best friend.', emoji: '🤝', timestamp: 3 },
      { id: '4', author: 'Marcus L.', year: '2022', text: 'Our table by the window was always reserved for CS group study. We called it "The War Room" 😂', emoji: '💻', timestamp: 4 },
    ],
  },
  {
    id: 'library',
    name: 'Library',
    subtitle: 'The Temple of Knowledge',
    position: [0, 0, -3],
    size: [3.2, 2.0, 2.6],
    color: '#6366f1',
    roofColor: '#4f46e5',
    emoji: '📚',
    description: 'Countless dreams were built, broken, and rebuilt within these quiet walls.',
    memories: [
      { id: '5', author: 'Priya M.', year: '2018', text: 'Level 4 silent zone, seat 14 — that was MY seat every exam season. Anyone else?', emoji: '📖', timestamp: 5 },
      { id: '6', author: 'Daniel W.', year: '2020', text: 'Cried after a bad midterm here. A senior I\'ve never met handed me tissues and said "It gets better." It did.', emoji: '🌟', timestamp: 6 },
      { id: '7', author: 'Fatimah A.', year: '2021', text: 'Found a love letter tucked inside a borrowed book. Still wonder what happened to them.', emoji: '💌', timestamp: 7 },
      { id: '8', author: 'Wei Chen', year: '2019', text: 'Survived 3 consecutive all-nighters here during finals. My caffeine tolerance will never recover.', emoji: '⚡', timestamp: 8 },
    ],
  },
  {
    id: 'lecture-hall',
    name: 'Lecture Hall A',
    subtitle: 'Where Minds Were Shaped',
    position: [4, 0, -1],
    size: [2.6, 1.6, 2.8],
    color: '#10b981',
    roofColor: '#059669',
    emoji: '🎓',
    description: 'A thousand lectures, countless epiphanies, and a few naps in the back row.',
    memories: [
      { id: '9', author: 'Ahmad F.', year: '2017', text: 'Prof. Rahman\'s first lecture on AI — I walked out knowing exactly what I wanted to do with my life.', emoji: '🤖', timestamp: 9 },
      { id: '10', author: 'Sofia N.', year: '2022', text: 'The back row was an entire ecosystem. We had snacks, memes, and a full commentary running during every lecture 😂', emoji: '🍿', timestamp: 10 },
      { id: '11', author: 'Jun Ho P.', year: '2020', text: 'First time presenting my research to 200 people. My hands were shaking but I did it.', emoji: '🎤', timestamp: 11 },
      { id: '12', author: 'Nadia R.', year: '2021', text: 'The seats near the AC were sacred. We arrived 30 mins early just to claim them.', emoji: '❄️', timestamp: 12 },
    ],
  },
  {
    id: 'hostel',
    name: 'Hostel Block C',
    subtitle: 'Home Away From Home',
    position: [-3.5, 0, -2.5],
    size: [2.4, 2.4, 2.4],
    color: '#f59e0b',
    roofColor: '#d97706',
    emoji: '🏠',
    description: 'Late nights, loud laughter, and the kind of friendships that last a lifetime.',
    memories: [
      { id: '13', author: 'Yusuf B.', year: '2018', text: 'Room 312 — we had a projector, a rice cooker, and zero sleep. The best year of my life.', emoji: '🎮', timestamp: 13 },
      { id: '14', author: 'Mei Ling', year: '2021', text: 'Midnight mamak runs with my floor-mates every single week. Those walks at 1am were therapy.', emoji: '🌙', timestamp: 14 },
      { id: '15', author: 'Arjun S.', year: '2019', text: 'The corridor outside room 201 — we\'d sit there and talk until 4am about life, universe, everything.', emoji: '✨', timestamp: 15 },
      { id: '16', author: 'Hana K.', year: '2022', text: 'Graduated and stood outside this block one last time. Cried the whole Grab ride to the airport.', emoji: '🥹', timestamp: 16 },
    ],
  },
  {
    id: 'sports',
    name: 'Sports Complex',
    subtitle: 'Where Champions Were Born',
    position: [3.5, 0, 3],
    size: [3.0, 1.0, 2.5],
    color: '#ec4899',
    roofColor: '#db2777',
    emoji: '⚽',
    description: 'Victory cheers, defeat tears, and the unity that sport creates.',
    memories: [
      { id: '17', author: 'Kelvin T.', year: '2020', text: 'Inter-faculty football finals. We were down 2-0. Came back 3-2. Still the greatest moment of my life.', emoji: '🏆', timestamp: 17 },
      { id: '18', author: 'Siti R.', year: '2019', text: 'Badminton court 3. Every Tuesday evening without fail. Those sessions kept me sane during stressful semesters.', emoji: '🏸', timestamp: 18 },
      { id: '19', author: 'Ethan C.', year: '2021', text: 'First time winning gold in swimming. My parents drove 4 hours to watch. Will never forget their faces.', emoji: '🥇', timestamp: 19 },
    ],
  },
  {
    id: 'admin',
    name: 'Admin Building',
    subtitle: 'The Nerve Centre',
    position: [0.5, 0, 1.5],
    size: [2.0, 2.8, 1.8],
    color: '#8b5cf6',
    roofColor: '#7c3aed',
    emoji: '🏛️',
    description: 'Registration queues, scholarship applications, and the longest lines in history.',
    memories: [
      { id: '20', author: 'Rina H.', year: '2018', text: 'Queued for 3 hours to change my elective. Met my study partner in the line. Worth it.', emoji: '🤣', timestamp: 20 },
      { id: '21', author: 'Farhan Z.', year: '2022', text: 'Collected my graduation scroll here. My hands were literally trembling. 4 years in 30 seconds.', emoji: '📜', timestamp: 21 },
    ],
  },
];

export const useCampusStore = create<CampusStore>((set) => ({
  buildings: initialBuildings,
  selectedBuilding: null,
  isZooming: false,
  showMemoryWall: false,
  setSelectedBuilding: (building) => set({ selectedBuilding: building }),
  setIsZooming: (v) => set({ isZooming: v }),
  setShowMemoryWall: (v) => set({ showMemoryWall: v }),
  addMemory: (buildingId, memory) =>
    set((state) => ({
      buildings: state.buildings.map((b) =>
        b.id === buildingId
          ? {
              ...b,
              memories: [
                ...b.memories,
                {
                  ...memory,
                  id: Math.random().toString(36).substr(2, 9),
                  timestamp: Date.now(),
                },
              ],
            }
          : b
      ),
      selectedBuilding:
        state.selectedBuilding?.id === buildingId
          ? {
              ...state.selectedBuilding,
              memories: [
                ...state.selectedBuilding.memories,
                {
                  ...memory,
                  id: Math.random().toString(36).substr(2, 9),
                  timestamp: Date.now(),
                },
              ],
            }
          : state.selectedBuilding,
    })),
}));

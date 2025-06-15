// data.js - Project Data Management

// Project categories mapping
const CATEGORY_MAPPING = {
    'GALLERY': 'interactive-design',
    'FILM': 'film-mix',
    'SERIES': 'sound-designer',
    'TVC': 'sound-designer',
    'SHORT FILM': 'film-mix',
    'DOCUMENTARY': 'film-mix',
    'DIGITAL ADVT': 'sound-designer',
    'MUSIC PRODUCER': 'music-producer',
    'SCORE': 'music-producer',
    'MUSIC': 'music-producer',
    'LABS': 'labs'
};

// Sample project data (you'll replace this with your full dataset)
const PROJECT_DATA = [
    // Gallery/Installation Projects
    {
        title: "A Passage Through Passages",
        category: "GALLERY",
        role: "Head of Sound",
        year: 2020,
        featured: true,
        details: "A 5-screen film that was at the centre of an exhibition that opened in January 2020 at SOAS, London. Exploring newly rebuilt roads across Pakistan, Sri Lanka, Maldives, and India.",
        collaboration: "Studio Camp / SOAS",
        location: "SOAS, London",
        technical: "5-screen installation, multichannel audio",
        context: "Exhibition on Roads and Politics of Thought",
        link: "https://studio.camp/projects/passages/",
        image_url: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=120&fit=crop&crop=center"
    },

    {
        title: "Mind Quantize",
        category: "LABS",
        role: "Concept / Development",
        year: 2019,
        featured: true,
        details: "Interactive installation interpreting brainwaves into sonic structures. Audio-visual installation at Serendipity Art Festival based on interpreting brainwaves into sonic structures.",
        collaboration: "Serendipity Art Festival",
        location: "Goa",
        technical: "EEG sensors, Max/MSP, real-time audio processing",
        context: "Neurofeedback Art Installation",
        image_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=120&fit=crop&crop=center"
    },

    // Film Projects
    {
        title: "A Terrible Beauty",
        category: "FILM",
        role: "Head of Sound",
        year: 2015,
        featured: true,
        details: "Winner of the Critics Award at the 36th Filmfare Awards. Critically acclaimed independent film exploring contemporary themes.",
        collaboration: "Independent Production",
        location: "Mumbai",
        technical: "Sound design, recording, mixing",
        context: "Award-winning independent cinema",
        link: "https://www.imdb.com/title/tt11464172/",
        image_url: "https://images.unsplash.com/photo-1489599511686-9297fde03200?w=300&h=120&fit=crop&crop=center"
    },

    {
        title: "Gangs of Wasseypur I & II",
        category: ["FILM", "MUSIC PRODUCER"],
        role: "Sound Designer / Music Mix",
        year: 2012,
        featured: true,
        details: "A critically acclaimed film from India. Credited with Recording, Designing and mixing of Sounds for Music of the film.",
        collaboration: "Phantom Films",
        location: "Mumbai",
        technical: "Recording, Sound Design, Music Mixing",
        context: "Contemporary Indian Cinema",
        image_url: "https://drive.google.com/file/d/139TNp4X5LRchpMTVNt-a2-R_dfisidIy/view?usp=sharing"
    },

    {
        title: "Dil Diya",
        category: ["FILM", "MUSIC PRODUCER"],
        role: "Recording / Mixing",
        year: 2006,
        featured: false,
        details: "Film score recording and mixing project.",
        technical: "Recording, Mixing",
        image_url: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=120&fit=crop&crop=center"
    },

    {
        title: "Nanhe Jaisalmer",
        category: ["FILM", "MUSIC PRODUCER"], 
        role: "Recording / Mixing",
        year: 2007,
        featured: false,
        details: "Film score recording and mixing project.",
        technical: "Recording, Mixing",
        image_url: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=300&h=120&fit=crop&crop=center"
    },

    {
        title: "Apne",
        category: "FILM",
        role: "Recording / Mixing", 
        year: 2007,
        featured: false,
        details: "Film score recording and mixing project.",
        technical: "Recording, Mixing",
        image_url: "https://images.unsplash.com/photo-1489599511686-9297fde03200?w=300&h=120&fit=crop&crop=center"
    },

    // Series Projects
    {
        title: "Sound Trippin",
        category: "SERIES",
        role: "Chief Sound Designer",
        year: 2018,
        featured: true,
        details: "A non-fiction show aired on MTV about designing and sampling instruments from different regions of India. Credited as Chief sound designer Engineer and Music Producer.",
        collaboration: "MTV India",
        location: "Pan-India",
        technical: "Sound design, sampling, music production",
        context: "Cultural documentation series",
        image_url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=120&fit=crop&crop=center"
    },

    {
        title: "Rejectx I & II",
        category: "SERIES",
        role: "Sound Designer",
        year: 2019,
        featured: false,
        details: "Youth drama series exploring contemporary themes and social dynamics.",
        collaboration: "Zee5",
        technical: "Sound design, post-production",
        image_url: "https://images.unsplash.com/photo-1512070679279-8988d32161be?w=300&h=120&fit=crop&crop=center"
    },

    {
        title: "Hello Mini I",
        category: "SERIES",
        role: "Sound Designer", 
        year: 2019,
        featured: false,
        details: "Digital series sound design project.",
        technical: "Sound design, post-production",
        image_url: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=300&h=120&fit=crop&crop=center"
    },

    // Documentary Projects  
    {
        title: "Ride to the Roots (Atmos Mix)",
        category: "DOCUMENTARY",
        role: "Sound Designer / Mix Engineer",
        year: 2017,
        featured: true,
        details: "A documentary film about electronic music artist Nucleya done for RedBull. Credited with Sound Designer and Mix Engineer.",
        collaboration: "RedBull Media House",
        technical: "Dolby Atmos mixing, sound design",
        context: "Electronic music documentary",
        image_url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=120&fit=crop&crop=center"
    },

    // TVC / Commercial Projects
    {
        title: "Tata Safari Campaign",
        category: ["TVC", "MUSIC PRODUCER"],
        role: "Sound Designer / Music Producer",
        year: 2023,
        featured: true,
        details: "Complete audio solution including original music composition, sound design, and final mix for Tata Safari advertisement campaign.",
        collaboration: "Tata Motors",
        location: "Mumbai",
        technical: "Music Production, Sound Design, Mixing",
        context: "Commercial Campaign",
        image_url: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300&h=120&fit=crop&crop=center"
    },

    {
        title: "Hyundai Digital Campaign",
        category: ["DIGITAL ADVT", "SOUND DESIGNER"],
        role: "Sound Designer",
        year: 2022,
        featured: false,
        details: "Digital advertising sound design for Hyundai's latest campaign.",
        collaboration: "Hyundai India",
        technical: "Sound design, audio branding",
        context: "Digital Marketing",
        image_url: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=300&h=120&fit=crop&crop=center"
    },

    // Music Production Projects
    {
        title: "Folk 2.0 Music Series",
        category: ["MUSIC PRODUCER", "SERIES"],
        role: "Music Producer / Sound Designer",
        year: 2020,
        featured: true,
        details: "Cultural music series exploring traditional and contemporary folk music. Music production and sound design for innovative folk fusion.",
        technical: "Music production, traditional instrument sampling",
        context: "Cultural fusion project",
        image_url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=120&fit=crop&crop=center"
    },

    {
        title: "Saheb Biwi Gangster Score",
        category: ["FILM", "MUSIC PRODUCER"],
        role: "Music Producer / Recording Engineer",
        year: 2011,
        featured: false,
        details: "Film score production and recording for Bollywood thriller.",
        technical: "Music production, recording, mixing",
        context: "Bollywood Film Score",
        image_url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=120&fit=crop&crop=center"
    }
];


// Data management class
class ProjectDataManager {
    constructor() {
        this.projects = [];
        this.categories = [];
        this.currentFilter = 'all';
    }

    // Initialize with project data
   loadData(projectArray = PROJECT_DATA) {
    this.projects = projectArray.map(project => {
        // Handle both single category (string) and multiple categories (array)
        const categories = Array.isArray(project.category) ? project.category : [project.category];
        
        // Map all categories and create a primary mapped category
        const mappedCategories = categories.map(cat => CATEGORY_MAPPING[cat] || 'labs');
        const primaryMappedCategory = mappedCategories[0]; // Use first as primary
        
        return {
            ...project,
            categories: categories, // Keep original categories
            mappedCategories: mappedCategories, // Mapped categories
            mappedCategory: primaryMappedCategory, // Primary for backwards compatibility
            image_url: project.image_url || '', // Handle image URL
            slug: this.createSlug(project.title)
        };
    });
    
    this.categories = [...new Set(this.projects.flatMap(p => p.mappedCategories))];
    console.log('Loaded projects:', this.projects.length);
    console.log('Categories:', this.categories);
    return this.projects;
}

    // Create URL-friendly slug from title
    createSlug(title) {
        return title.toLowerCase()
                   .replace(/[^\w\s-]/g, '')
                   .replace(/\s+/g, '-');
    }

    // Get all projects
    getAllProjects() {
        return this.projects;
    }

    // Get featured projects
    getFeaturedProjects() {
        return this.projects.filter(project => project.featured);
    }

    // Filter projects by category
   filterByCategory(category) {
    if (category === 'all') {
        return this.projects;
    }
    return this.projects.filter(project => 
        project.mappedCategories.includes(category)
    );
}
    // Get project by slug
    getProjectBySlug(slug) {
        return this.projects.find(project => project.slug === slug);
    }

    // Search projects
    searchProjects(query) {
        const searchTerm = query.toLowerCase();
        return this.projects.filter(project => 
            project.title.toLowerCase().includes(searchTerm) ||
            project.details.toLowerCase().includes(searchTerm) ||
            project.role.toLowerCase().includes(searchTerm)
        );
    }

    // Get projects by year range
    getProjectsByYearRange(startYear, endYear) {
        return this.projects.filter(project => 
            project.year >= startYear && project.year <= endYear
        );
    }

    // Get statistics
    getStats() {
        const years = this.projects.map(p => p.year).filter(y => y && y !== 'N/A');
        const minYear = Math.min(...years);
        const maxYear = Math.max(...years);
        const yearsActive = maxYear - minYear + 1;

        return {
            totalProjects: this.projects.length,
            featuredProjects: this.getFeaturedProjects().length,
            categories: this.categories.length,
            yearsActive: isFinite(yearsActive) ? yearsActive : 0,
            yearRange: `${minYear}-${maxYear}`
        };
    }
}

// Global data manager instance
window.dataManager = new ProjectDataManager();
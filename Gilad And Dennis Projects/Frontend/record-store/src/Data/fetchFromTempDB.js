import songs from './TempDataBases/songs';
import albums from './TempDataBases/albums';
import artists from './TempDataBases/artists'

export function getSongs(name=null, album=null, artist=null, nameIncludes=null, isList=true) {
    const filterFunction = songItem => ((!name || songItem.name===name) && 
    (!album || songItem.album===album) && 
    (!artist || songItem.artist===artist) &&
    (!nameIncludes || songItem.name.toLowerCase().includes(nameIncludes.toLowerCase())));    
    if (isList) {
        return songs.filter(filterFunction);
    }
    return songs.find(filterFunction);
}

export function getAlbums(name=null, artist=null, nameIncludes=null, isList=true) {
    const filterFunction = albumItem => ((!name || albumItem.name===name) &&     
    (!artist || albumItem.artist===artist) &&
    (!nameIncludes || albumItem.name.toLowerCase().includes(nameIncludes.toLowerCase())));
    
    if (isList) {
        return songs.filter(filterFunction);
    }
    return songs.find(filterFunction);
}

export function getArtists(name, nameIncludes=null, isList=true) {
    const filterFunction = artistItem => ((!name || artistItem.name===name) &&         
    (!nameIncludes || artistItem.name.toLowerCase().includes(nameIncludes.toLowerCase())));
    
    if (isList) {
        return songs.filter(filterFunction);
    }
    return songs.find(filterFunction);
}
const getTorrent = async (url, setURL) => {
    const WebTorrent = require('webtorrent/webtorrent.min.js')
    const client = new WebTorrent()

    client.add(url, torrent=>{
       setURL(torrent.magnetURI)
    })
}

export default getTorrent;
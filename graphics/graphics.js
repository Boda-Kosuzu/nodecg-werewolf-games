window.onload = () => {
  const playerList = document.getElementById('playerList')
  const replicant = nodecg.Replicant('nodecg-werewolf-games')
  const position = {
    werewolf: '人狼',
    kyoujin: '狂人',
    kyousinsya: '狂信者',
    murabito: '村人',
    uranaishi: '占い師',
    reinousya: '霊能者',
    kishi: '騎士',
    kyouyuusya: '共有者',
    kitune: '狐',
    haitokusya: '背徳者'
  }

  const createPlayerImage = url => {
    const img = document.createElement('img')
    img.src = url
    img.classList.add('player-image')

    return img
  }

  const createPosition = positionId => {
    const positionName = document.createElement('div')
    positionName.innerText = position[positionId]
    positionName.classList.add('position-name')

    return positionName
  }

  const createPlayerName = name => {
    const playerName = document.createElement('div')
    playerName.innerText = name.replace(/\.(png|jpg|jpeg|gif)/g, '')
    playerName.classList.add('player-name')

    return playerName
  }

  const createBackIcon = positionId => {
    const backIcon = document.createElement('div')
    backIcon.classList.add('icon', `backIcon-${positionId}`)

    return backIcon
  }

  replicant.on('change', players => {
    playerList.innerHTML = ''

    players.forEach(player => {
      const li = document.createElement('li')
      li.classList.add('player', player.position)

      if (player.isDead) li.classList.add('dead')

      li.appendChild(createBackIcon(player.position))
      li.appendChild(createPosition(player.position))
      li.appendChild(createPlayerImage(player.url))
      li.appendChild(createPlayerName(player.name))

      playerList.appendChild(li)
    });
  })
}
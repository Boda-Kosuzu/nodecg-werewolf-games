window.onload = () => {
  const positions = [
    { name: 'werewolf', display: '人狼'},
    { name: 'kyoujin', display: '狂人'},
    { name: 'kyousinsya', display: '狂信者'},
    { name: 'murabito', display: '村人'},
    { name: 'uranaishi', display: '占い師'},
    { name: 'reinousya', display: '霊能者'},
    { name: 'kishi', display: '騎士'},
    { name: 'kyouyuusya', display: '共有者'},
    { name: 'kitune', display: '狐'},
    { name: 'haitokusya', display: '背徳者'},
  ]
  let playerData = []
  const playerList = document.getElementById('playerList')
  const submit = document.getElementById('submit')
  const replicant = nodecg.Replicant('nodecg-werewolf-games')
  const thumbnails = nodecg.Replicant('assets:nodecg-werewolf-games');

  const createImgName = name => {
    const imgName = document.createElement('div')
    imgName.innerText = name

    return imgName
  }

  const createPositionSelect = (index, item) => {
    const select = document.createElement('select')
    select.value = 'murabito'

    positions.forEach(position => {
      const option = document.createElement('option')
      option.innerText = position.display
      option.value = position.name
      if (position.name === 'murabito') option.selected = true

      select.appendChild(option)
    })

    select.onchange = (e) => {
      item.position = select.value
    }

    return select
  }

  const createCheckbox = (index, item) => {
    const check = document.createElement('div')
    const text = document.createElement('label')
    const checkbox = document.createElement('input')

    checkbox.id = `checkbox-${index}`
    checkbox.type = 'checkbox'
    checkbox.checked = false
    checkbox.onchange = () => {
      item.isDead = checkbox.checked
    }

    text.setAttribute('for', `checkbox-${index}`)
    text.innerText = '死亡'

    check.appendChild(text)
    check.appendChild(checkbox)

    return check
  }

  thumbnails.on('change', characters => {
    playerList.innerHTML = ''
    playerData = []

    characters.forEach((item, index) => {
      const li = document.createElement('li')
      const listItem = document.createElement('div')
      listItem.classList.add('playerList-classList')

      playerData.push({
        name: item.base,
        url: item.url,
        isDead: false,
        position: 'murabito'
      })

      listItem.appendChild(createImgName(item.base))
      listItem.appendChild(createPositionSelect(index, playerData[index]))
      listItem.appendChild(createCheckbox(index, playerData[index]))

      li.appendChild(listItem)

      playerList.appendChild(li)
    })
  })

  submit.onclick = () => {
    replicant.value = playerData
  }
}

let _token = document.querySelector('input[name=_token]') && document.querySelector('input[name=_token]').value
let userId = document.querySelector('.panelin').dataset.userid
let caridId = document.querySelector('.panelin').dataset.caridid


let thumbswiper = new Swiper('.panelin__thumbs__swiper', {
    grabCursor: true,
    slidesPerView: 3,
    spaceBetween: 11,
    breakpoints: {
        1025: {
            spaceBetween: 25
        }
    }
})
let mainswiper = new Swiper('.panelin__mainswiper__swiper', {
    grabCursor: true,
    slidesPerView: 1,
    spaceBetween: 25,
    thumbs: {
        swiper: thumbswiper
    }
})

const usercommenttextarea = document.getElementById('usercommenttextarea')
const admincommenttextarea = document.getElementById('admincommenttextarea')
const textareaAddComment = document.getElementById('textareaAddComment')

const textareaAutoGrow = (el) => {
    el.style.height = '5px'
    el.style.height = el.scrollHeight + 'px'
}

textareaAutoGrow(usercommenttextarea)
textareaAutoGrow(textareaAddComment)
textareaAutoGrow(admincommenttextarea)

textareaAddComment.addEventListener('input', () => {
    textareaAutoGrow(textareaAddComment)
})
usercommenttextarea.addEventListener('input', () => {
    textareaAutoGrow(usercommenttextarea)
})


const addCommentForm = document.querySelector('.panelin__comments__form')
const userCommentEditForm = document.querySelector('.panelin__comments__usercomment')

addCommentForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    if (textareaAddComment.value.length > 1 && !userCommentEditForm.classList.contains('exists')) {

        // post comment to server

        // let response = await axios.post(userCommentPostUrl, {
        //     userId,
        //     carId,
        //     comment: textareaAddComment.value,
        //     token: _token
        // })
        let response = {
            data: {
                date: 'Mar 25, 22:00 PM'
            }
        }
        const userCommentDateEl = document.querySelector('.panelin__comments__usercomment .panelin__comments__profile__date')


        usercommenttextarea.value = textareaAddComment.value
        textareaAddComment.value = ''
        textareaAutoGrow(textareaAddComment)
        userCommentDateEl.innerHTML = response.data.date
        userCommentEditForm.classList.add('exists')
        textareaAutoGrow(usercommenttextarea)
        addCommentForm.classList.add('inactive')
    }
})
const editUserCommentBtn = document.querySelector('.panelin__comments__usercomment__edit')


editUserCommentBtn.addEventListener('click', () => {
    usercommenttextarea.disabled = !usercommenttextarea.disabled
    usercommenttextarea.focus()
    editUserCommentBtn.classList.toggle('inEditing')
})

userCommentEditForm.addEventListener('submit', e => {
    e.preventDefault()
    // post comment to server

    // let response = await axios.post(userCommentPostUrl, {
    //     userId,
    //     carId,
    //     comment: textareaAddComment.value,
    //     token: _token
    // })
    let response = {
        data: {
            date: 'Mar 15, 22:00 PM'
        }
    }

    const userCommentDateEl = document.querySelector('.panelin__comments__usercomment .panelin__comments__profile__date')


    usercommenttextarea.value = usercommenttextarea.value
    userCommentDateEl.innerHTML = response.data.date
    userCommentEditForm.classList.add('exists')
    textareaAutoGrow(usercommenttextarea)
    editUserCommentBtn.click()
})


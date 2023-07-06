import { defineStore } from 'pinia'
import axios from 'axios'
import { notify } from '@kyvg/vue3-notification'
export const useCounterStore = defineStore('counter', {
  state: () => ({
    baseUrl: 'https://codejourneyai.lrizkitegar.site',
    // Prompt
    customSchedule: false,
    recommendedSchedule: false,
    listRecommendedSchedule: [],
    prompt: [],
    checklistPrompt: [],
    tempSchedule: {},
    // Schedule
    schedules: [],
    scheduleDetail: undefined,
    isFailLoadData: false,
    currentMonth: {},
    lengthMonth: {},
    selectedSchedule: {},
    convertedSchedule: [],
    monthlySchedule: [],
  }),
  getters: {
    // doubleCount: (state) => state.count * 2,
  },
  actions: {
    async handleLogin(email, password, newUser) {
      try {
        let user = await axios({
          url: this.baseUrl + '/login',
          method: 'post',
          data: { email, password }
        })
        localStorage.setItem('access_token', user.data.access_token)
        localStorage.setItem('username', user.data.username)
        notify({
          title: 'Success',
          text: 'Login Success',
          type: 'success'
        })
        if (!newUser) this.router.push('/')
      } catch (err) {
        const { msg } = err.response.data
        notify({
          title: 'Login Failed',
          text: msg,
          type: 'error'
        })
        console.log(msg)
      }
    },
    async handleRegister(username, email, password) {
      try {
        
        await axios({
          url: this.baseUrl + '/register',
          method: 'post',
          data: { username, email, password }
        })
        await this.handleLogin(email, password)
        this.router.push('/prompt')
      } catch (err) {
        const { msg } = err.response.data
        notify({
          title: 'Register Failed',
          text: msg,
          type: 'error'
        })
        console.log(err)
      }
    },
    handleLogout() {
      localStorage.clear()
      this.router.push('/login')
    },
    async handleCustomPrompt(description) {
      // this.prompt.push(description)
      // console.log(description, 'ISI PROMPT CUSTOM')
      try {
        const { data } = await axios({
          url: this.baseUrl + '/generatecustomtask',
          method: 'post',
          headers: {
            access_token: localStorage.getItem('access_token')
          },
          data: {
            prompt: description
          }
        })
        this.tempSchedule = data
        this.customSchedule = true
      } catch (err) {
        const { msg } = err.response.data
        notify({
          title: 'Error Prompting',
          text: msg,
          type: 'error'
        })
        console.log(err)
      }
    },
    async fetchRecommendedSchedule() {
      try {
        const { data } = await axios({
          url: this.baseUrl + '/recommended',
          method: 'get',
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        this.listRecommendedSchedule = data
        // console.log(this.listRecommendedSchedule)
      } catch (err) {
        const { msg } = err.response.data
        notify({
          title: 'Error Prompting',
          text: msg,
          type: 'error'
        })
        console.log(err)
      }
    },
    handleRecommendedPrompt(id) {
      const selectedSchedule = this.listRecommendedSchedule.find((el) => el._id == id)
      this.tempSchedule.title = selectedSchedule.title
      this.tempSchedule.tasks = selectedSchedule.schedules
      this.recommendedSchedule = true
      // console.log(this.prompt, 'ISI PROMPT RECOMMENDED')
    },
    async postSchedule(schedule) {
      console.log(schedule)
      try {
        const { data } = await axios({
          url: this.baseUrl + '/schedules',
          method: 'POST',
          headers: {
            access_token: localStorage.getItem('access_token')
          },
          data: schedule
        })
        notify({
          title: 'Success',
          text: data.msg,
          type: 'success'
        })
        this.router.push('/')
      } catch (error) {
        const { msg } = err.response.data
        notify({
          title: 'Error',
          text: msg,
          type: 'error'
        })
        console.log(error)
      }
    },
    async fetchSchedule() {
      try {
        this.schedules = undefined
        let { data: schedules } = await axios({
          url: this.baseUrl + '/schedules',
          method: 'get',
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        this.isFailLoadData = false
        this.schedules = schedules
        schedules.forEach((el) => {
          this.currentMonth[el.name] = 0
          this.lengthMonth[el.name] = 0
        })
        // console.log(schedules)
      } catch (err) {
        this.isFailLoadData = true
        console.log(err)
      }
    },
    async fetchScheduleDetail(sc_id, ts_id) {
      try {
        // console.log("fetch data")
        this.scheduleDetail = undefined
        let { data: details } = await axios({
          url: this.baseUrl + `/schedules/${sc_id}/${ts_id}`,
          method: 'get',
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        this.isFailLoadData = false
        this.scheduleDetail = details
      } catch (err) {
        this.isFailLoadData = true
        console.log(err)
      }
    },
    async deleteSchedule(id) {
      try {
        const schedule = await axios({
          url: this.baseUrl + `/schedules/${id}`,
          method: 'delete',
          headers: { access_token: localStorage.getItem('access_token') }
        })
        await this.fetchSchedule()
        this.router.push('/')
      } catch (err) {
        console.log(err)
      }
    },
    async fetchScheduleById(id) {
      try {
        const { data: schedule } = await axios({
          url: this.baseUrl + '/schedules/' + id,
          method: 'get',
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        this.selectedSchedule = schedule
        this.convertedSchedule = this.convertSchedule(schedule)
        this.monthlySchedule = this.formatSchedule(this.convertedSchedule)
        this.currentMonth[this.selectedSchedule.scheduleTitle] = 0
        this.lengthMonth[this.selectedSchedule.scheduleTitle] = this.monthlySchedule.length - 1
      } catch (error) {
        console.log(error)
      }
    },
    convertSchedule(Schedule) {
      let currentDate = new Date(Schedule.startDate)
      const { schedules } = Schedule
      schedules.forEach((el) => {
        let day = currentDate.getDay()
        if (day === 6) currentDate.setDate(currentDate.getDate() + 2)
        if (day === 0) currentDate.setDate(currentDate.getDate() + 1)
        el.date = new Date(currentDate)
        currentDate.setDate(currentDate.getDate() + 1)
      })
      return schedules
    },
    formatSchedule(cvtSc) {
      console.log(cvtSc)
      let Monthly_Schedule = []
      let month = cvtSc[0].date.getMonth()
      let monthTemp = []
      let weekTemp = []
      cvtSc.forEach((el) => {
        if (el.date.getMonth() !== month) {
          Monthly_Schedule.push(monthTemp)
          month = el.date.getMonth()
          monthTemp = []
        }
        if (el.date.getDay() === 1 && weekTemp !== []) {
          monthTemp.push(weekTemp)
          weekTemp = []
        }
        weekTemp.push(el)
      })
      monthTemp.push(weekTemp)
      Monthly_Schedule.push(monthTemp)
      return Monthly_Schedule
    },
    async patchTask(sch_id, tsk_id) {
      try {
        const { data } = await axios({
          url: this.baseUrl + '/schedules/' + sch_id,
          method: 'patch',
          headers: {
            access_token: localStorage.getItem('access_token')
          },
          data: {
            taskId: tsk_id
          }
        })
        console.log(data)
        this.router.push(`/schedule/${sch_id}`)
      } catch (error) {
        console.log(error)
      }
    }
  }
})

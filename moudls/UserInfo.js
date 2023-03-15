export default class UserInfo {
  constructor(userName, userJob) {
    this._userName = userName;
    this._userJob = userJob;
  }

  getUserInfo() {
    this._userInfoValues = {};
    this._userInfoValues['name'] = this._userName.textContent;
    this._userInfoValues['job'] = this._userJob.textContent;

    return this._userInfoValues;
  }

  setUserInfo(name, job) {
    this._userName.textContent = name;
    this._userJob.textContent = job;
  }
}

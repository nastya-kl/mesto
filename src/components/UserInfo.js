export default class UserInfo {
  constructor(userName, userJob, userAvatar) {
    this._userName = userName;
    this._userJob = userJob;
    this._avatar = userAvatar;
  }

  getProfileInfo() {
    this._userInfoValues = {};
    this._userInfoValues['name'] = this._userName.textContent;
    this._userInfoValues['job'] = this._userJob.textContent;

    return this._userInfoValues;
  }

  setProfileInfo(data) {
    this._userName.textContent = data.name;
    this._userJob.textContent = data.about;
  }

  changeProfileAvatar(data) {
    this._avatar.src = data.avatar;
    console.log(data);
  }
}

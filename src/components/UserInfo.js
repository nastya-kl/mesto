export default class UserInfo {
  constructor(userName, userJob, userAvatar) {
    this._userName = userName;
    this._userJob = userJob;
    this._userAvatar = userAvatar;
  }

  getProfileInfo() {
    this._userInfoValues = {};
    this._userInfoValues['name'] = this._userName.textContent;
    this._userInfoValues['job'] = this._userJob.textContent;

    return this._userInfoValues;
  }

  setProfileInfo(name, about, avatar, id) {
    this._userName.textContent = name;
    this._userJob.textContent = about;
    this._userAvatar.src = avatar;
    this._id = id;
  }

  changeProfileAvatar(data) {
    this._userAvatar.src = data.avatar;
  }
}

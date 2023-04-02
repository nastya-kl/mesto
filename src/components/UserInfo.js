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

  setProfileInfo({ name, about, avatar, _id }) {
    this._userName.textContent = name;
    this._userJob.textContent = about;
    this.changeProfileAvatar(avatar);
    this._id = _id;
  }

  changeProfileAvatar(avatar) {
    this._userAvatar.src = avatar;
  }
}

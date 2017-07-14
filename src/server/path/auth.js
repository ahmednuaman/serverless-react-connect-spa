export const login = (req, res, next) =>
  res
    .status(200)
    .end({
      user: req.user
    })

export const logout = (req, res, next) =>
  res
    .status(200)
    .end()

import React, { Component } from "react";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      password_confirm: "",
      errors: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  async handleSubmit(e) {
    e.preventDefault();
    const user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password_confirm: this.state.password_confirm
    };

    const response = await fetch(
      "https://shop-api.frameworks.software/api/v1/acces/enregistrer",
      {
        method: "POST",
        body: JSON.stringify(user)
      }
    ).catch(errors => console.log(errors));

    const data = await response.json();
    if (data.errors) {
      const errors = data.errors;
      this.setState({ errors });
    }
    if (data.success) {
      this.props.history.push("/connexion");
    }
  }
  render() {
    const { errors } = this.state;

    return (
      <main id="inscription">
        <header>
          <h1>Inscription</h1>
        </header>
        <section>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">
                Nom{" "}
                {errors.name && (
                  <span className="error"> &#9888; {errors.name}</span>
                )}
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Entrer votre email"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">
                Email{" "}
                {errors.email && (
                  <span className="error"> &#9888; {errors.email}</span>
                )}
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Entrer votre email"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">
                Mot de passe{" "}
                {errors.password && (
                  <span className="error"> &#9888; {errors.password}</span>
                )}
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Entrer votre mot de passe"
                onChange={this.handleChange}
                autoComplete="false"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password_confirm">
                Confirmer le mot de passe
                {errors.password_confirm && (
                  <span className="error"> &#9888; {errors.password}</span>
                )}
              </label>
              <input
                type="password"
                name="password_confirm"
                id="password_confirm"
                placeholder="Entrer votre mot de passe"
                onChange={this.handleChange}
                autoComplete="false"
              />
            </div>
            <input type="submit" value="S'inscrire" />{" "}
          </form>
        </section>
      </main>
    );
  }
}

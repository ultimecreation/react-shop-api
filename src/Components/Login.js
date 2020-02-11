import React, { Component } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
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
      email: this.state.email,
      password: this.state.password
    };

    const response = await fetch(
      "https://shop-api.frameworks.software/api/v1/acces/connecter",
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
    if (data.token) {
      const token = data.token;
      if (token.startsWith("Bearer ")) {
        this.context.setToken(token);
        this.props.history.push("/mon-compte");
      }
    }
  }
  render() {
    const { errors } = this.state;

    return (
      <main id="connexion">
        <header>
          <h1>Connexion</h1>
        </header>
        <section>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">
                Email{" "}
                {errors.email && (
                  <span className="error"> &#9888; {errors.email}</span>
                )}
              </label>
              <input
                type="text"
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
            <input type="submit" value="Se Connecter" />{" "}
          </form>
          <p>
            Pas enregistrer ? <Link to="/inscription">Je créer mon Compte</Link>
          </p>
        </section>
      </main>
    );
  }
}
Login.contextType = UserContext;

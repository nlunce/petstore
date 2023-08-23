import { useState } from "react";
import { Pets } from "./ui-components";
import { NavBar } from "./ui-components";
import { Footer } from "./ui-components";
import { AddPet } from "./ui-components";
import { PetDetails } from "./ui-components";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { Storage } from "@aws-amplify/storage";

function App({ user, signOut }) {
  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [pet, setPet] = useState();
  const [updatePet, setUpdatePet] = useState();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [breed, setBreed] = useState("");
  const [about, setAbout] = useState("");
  const [color, setColor] = useState("");
  const [image, setImage] = useState("");

  const formOverride = {
    TextField29766922: {
      placeholder: name,
    },
    TextField29766923: {
      placeholder: age,
    },
    TextField29766924: {
      placeholder: breed,
    },
    TextField3856423: {
      placeholder: color,
    },
    TextField3856430: {
      placeholder: about,
    },
    TextField3856437: {
      placeholder: image,
    },
    image: {
      src:
        updatePet == null
          ? "https://source.unsplash.com/random/900×700/?dog"
          : updatePet.image,
    },
    Button3856445: {
      isDisabled: !updatePet ? true : false,
    },

    Button29766926: {
      isDisabled: updatePet ? true : false,
    },

    MyIcon: {
      style: {
        cursor: "pointer",
      },
      onClick: () => {
        setShowForm(false);
        setUpdatePet(false);
      },
    },
  };

  const detailsOverride = {
    Close: {
      style: {
        cursor: "pointer",
      },
      onClick: () => {
        setShowDetails(false);
      },
    },
  };

  const navBarOverrides = {
    "Add Pet": {
      style: {
        cursor: "pointer",
      },
      onClick: () => {
        setShowForm(!showForm);
      },
    },
    Button: {
      onClick: signOut,
    },
    image: {
      src: user?.attributes?.profile,
    },
  };

  return (
    <div className="App">
      <nav>
        <NavBar width={"100%"} overrides={navBarOverrides} />
      </nav>

      <body>
        {showDetails && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <PetDetails
              overrides={detailsOverride}
              pet={pet}
              style={{
                textAlign: "left",
                margin: "1rem",
              }}
            />
          </div>
        )}

        {showForm && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AddPet
              pet={updatePet}
              overrides={formOverride}
              style={{
                textAlign: "left",
                margin: "1rem",
              }}
            />
          </div>
        )}

        <Pets
          overrideItems={({ item, index }) => ({
            overrides: {
              Button29766907: {
                onClick: () => {
                  setPet(item);
                  setShowDetails(!showDetails);
                },
              },
              Button3849418: {
                onClick: () => {
                  if (!showForm) {
                    setShowForm(true);
                  }
                  setUpdatePet(item);
                  setName(item.name);
                  setAge(item.age);
                  setBreed(item.breed);
                  setColor(item.color);
                  setAbout(item.about);
                  setImage(item.image);
                },
              },
            },
          })}
        />
      </body>

      <footer>
        <Footer width={"100%"} />
      </footer>
    </div>
  );
}

export default withAuthenticator(App);

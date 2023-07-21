import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Movie from "./Movie";

describe("<Movie />", () => {
  it("should render movie details correctly", async () => {
    const movie = {
      id: 123,
      title: "Test Movie",
      poster_path: "/path/to/poster.jpg",
      vote_average: 7.5,
    };

    const { getByText, getByAltText, getByLabelText } = render(
      <MemoryRouter>
        <Movie movie={movie} i={1} />,
      </MemoryRouter>,
    );

    expect(getByAltText(movie.title)).toBeInTheDocument();
    expect(getByText(movie.title)).toBeInTheDocument();
    expect(getByLabelText(`${movie.vote_average} / 10`)).toBeInTheDocument();
  });
});

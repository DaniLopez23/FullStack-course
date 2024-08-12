const { test, expect, beforeEach, describe } = require("@playwright/test");
import { strict } from "assert";
import bcrypt from "bcrypt";

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http:localhost:3001/api/testing/reset");
    await request.post("http://localhost:3001/api/users", {
      data: {
        name: "Matti Luukkainen",
        username: "mluukkai",
        password: "salainen",
      },
    });

    await page.goto("http://localhost:5173");
  });

  describe("Login", () => {
    test("Login form is shown", async ({ page }) => {
      await page.goto("http://localhost:5173");

      await page.getByRole("button", { name: "login" }).click();

      await expect(page.getByTestId("username")).toBeVisible();
      await expect(page.getByTestId("password")).toBeVisible();
      await expect(page.getByRole("button", { name: "login" })).toBeVisible();
    });

    test("succeeds with correct credentials", async ({ page }) => {
      await page.goto("http://localhost:5173");

      await page.getByRole("button", { name: "login" }).click();
      await page.getByTestId("username").fill("mluukkai");
      await page.getByTestId("password").fill("salainen");

      await page.getByRole("button", { name: "login" }).click();

      await expect(page.getByText("Matti Luukkainen logged-in")).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await page.getByRole("button", { name: "login" }).click();
      await page.getByTestId("username").fill("mluukkai");
      await page.getByTestId("password").fill("wrong");
      await page.getByRole("button", { name: "login" }).click();

      await expect(page.getByText("wrong credentials")).toBeVisible();
    });
  });

  describe("When logged in", () => {
    beforeEach(async ({ page, request }) => {
      await request.post("http:localhost:3001/api/testing/reset");
      await request.post("http://localhost:3001/api/users", {
        data: {
          name: "Matti Luukkainen",
          username: "mluukkai",
          password: "salainen",
        },
      });
  
      await page.goto("http://localhost:5173");

      await page.getByRole("button", { name: "login" }).click();
      await page.getByTestId("username").fill("mluukkai");
      await page.getByTestId("password").fill("salainen");

      await page.getByRole("button", { name: "login" }).click();
    });

    test("a new blog can be created", async ({ page }) => {
      await page.getByRole("button", { name: "new note" }).click();
      await page.getByTestId("title").fill("hello im testing E2E");
      await page.getByTestId("author").fill("salainen");
      await page.getByTestId("url").fill("www.salainen.com");
      await page.getByRole("button", { name: "create" }).click();
      await expect(
        page.locator('.blog:has-text("hello im testing E2E")')
      ).toBeVisible();
    });

    test("a new blog can be liked", async ({ page }) => {

      await page.getByRole("button", { name: "new note" }).click();
      await page.getByTestId("title").fill("hello im testing E2E");
      await page.getByTestId("author").fill("salainen");
      await page.getByTestId("url").fill("www.salainen.com");
      await page.getByRole("button", { name: "create" }).click();

      await page.getByRole("button", { name: "view" }).click();

      await expect(page.getByRole("button", { name: "like" })).toBeVisible;
    });

    test("a new blog can be deleted", async ({ page }) => {

      // Escuchar el evento 'console'
      page.on('console', msg => {
        console.log(`Mensaje de consola: ${msg.text()}`);
      });
    
    
      await page.getByRole("button", { name: "new note" }).click();
      await page.getByTestId("title").fill("hello im testing E2E");
      await page.getByTestId("author").fill("salainen");
      await page.getByTestId("url").fill("www.salainen.com");
      await page.getByRole("button", { name: "create" }).click();
      await page.getByRole("button", { name: "view" }).click();
      await page.getByRole("button", { name: "remove" }).click();

      await page.on("dialog", async dialog => {
        await dialog.accept
        await expect(page.getByText("Matti Luukkainen logged-in")).toBeHidden();
      })
      

    });


  });
});

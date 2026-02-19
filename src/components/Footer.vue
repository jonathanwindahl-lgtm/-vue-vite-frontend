<script setup></script>

<template>
  <div class="divider"></div>

  <footer>
    <div class="footer-section">
      <section>
        <h3>Kontakta oss</h3>
        <p>kundservice@springskor.se</p>
      </section>

      <section>
        <h3>Kundservice</h3>
        <nav>
          <ul>
            <li><a href="#">Kontakta oss</a></li>
            <li><a href="#">Vanliga frågor och svar</a></li>
            <li><a href="#">Återkallelse</a></li>
            <li><a href="#">Köpvillkor</a></li>
          </ul>
        </nav>
      </section>

      <section>
        <h3>Om Springskor</h3>
        <nav>
          <ul>
            <li><a href="#">Club Springskor</a></li>
            <li><a href="#">Karriär på Springskor</a></li>
            <li><a href="#">Vårt ansvar</a></li>
            <li><a href="#">Service</a></li>
          </ul>
        </nav>
      </section>

      <section>
        <h3>Aktuellt</h3>
        <nav>
          <ul>
            <li><a href="#">Träning</a></li>
            <li><a href="#">Löpning</a></li>
            <li><a href="#">Outdoor</a></li>
          </ul>
        </nav>
      </section>
    </div>

    <p>© 2025 Springskor AB</p>
  </footer>
</template>

<style scoped>
.footer-section {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  color: #0077cc;
}

.footer-section li {
  list-style: none;
}

a {
  color: #0077cc;
  text-decoration: none;
  font-weight: bold;
}

.footer-section ul {
  padding: 0;
  margin: 0;
}

.divider {
  background-color: #0077cc;
  height: 5px;
  margin: 5px 0 10px;
}
</style>

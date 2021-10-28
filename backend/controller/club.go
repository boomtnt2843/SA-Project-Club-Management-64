package controller

import(
	"net/http"

	"github.com/boomertnt210943/my-app/entity"
	"github.com/gin-gonic/gin"
)

// POST /club
func CreateClub(c *gin.Context) {
	var club entity.Club
	var adviser entity.Teacher
	var adder entity.StudentCouncil
	var typeClub entity.TypeClub

	//8
	if err := c.ShouldBindJSON(&club); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//9 type club
	if tx := entity.DB().Where("id = ?", club.TypeClubID).First(&typeClub); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "type club not found"})
		return
	}

	//10 teacher
	if tx := entity.DB().Where("id = ?", club.AdviserID).First(&adviser); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "adviser not found"})
		return
	}

	//11 Student Council
	if tx := entity.DB().Where("id = ?", club.AdderID).First(&adder); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "student council not found"})
		return
	}

	//12 create
	newClub := entity.Club{
		Adder: 		adder,
		Adviser: 	adviser,
		TypeClub: 	typeClub,
		Name: 		club.Name,
	}

	//13 save
	if err := entity.DB().Create(&newClub).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": newClub})
}


// GET /club/:id
func GetClub(c *gin.Context) {
	var club entity.Club
	id := c.Param("id")
	if err := entity.DB().Preload("StudentCouncil").Preload("Teacher").Preload("TypeClub").Raw("SELECT * FROM clubs WHERE id = ?", id).Find(&club).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": club})
}

// GET /clubs
func ListClubs(c *gin.Context) {
	var clubs []entity.Club
	if err := entity.DB().Preload("Adder").Preload("Adviser").Preload("TypeClub").Raw("SELECT * FROM clubs").Find(&clubs).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": clubs})
}

// DELETE /teachers/:id
func DeleteClub(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM clubs WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "teacher not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /teachers
func UpdataClub(c *gin.Context) {
	var club entity.Club
	if err := c.ShouldBindJSON(&club); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", club.ID).First(&club); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "club not found"})
		return
	}

	if err := entity.DB().Save(&club).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": club})
}
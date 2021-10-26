package entity

import (
	"golang.org/x/crypto/bcrypt"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func SetupDatabase() {
	database, err := gorm.Open(sqlite.Open("sa-64.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
	
	database.AutoMigrate(
		&Club{}, 
		&Teacher{}, 
		&StudentCouncil{}, 
		&TypeClub{},
	)

	db = database
	
	password, err := bcrypt.GenerateFromPassword([]byte("1234ab"), 14)

	//student council
	db.Model(&StudentCouncil{}).Create(&StudentCouncil{
		Name: "นารา สิงห์ใจ",
		Student_id: "B6223412",
		Password: string(password),
	})

	db.Model(&StudentCouncil{}).Create(&StudentCouncil{
		Name: "มีนา น่าอยู่",
		Student_id: "B6178531",
		Password: string(password),
	})

	db.Model(&StudentCouncil{}).Create(&StudentCouncil{
		Name: "ปศิมา สาครศิลป์",
		Student_id: "B6289123",
		Password: string(password),
	})

	//teacher
	db.Model(&Teacher{}).Create(&Teacher{
		Name: "อ.ศิลกรรม ประยูร",
	})
	db.Model(&Teacher{}).Create(&Teacher{
		Name: "อ.ประจักร วาติการ",
	})
	db.Model(&Teacher{}).Create(&Teacher{
		Name: "อ.ดร.คาคง นิสันต์",
	})
	db.Model(&Teacher{}).Create(&Teacher{
		Name: "อ.ปรนัย จงจำมั่น",
	})
	db.Model(&Teacher{}).Create(&Teacher{
		Name: "อ.ประสาสี กลิ่นแก้ว",
	})

	//type club
	sportsClubs := TypeClub{
		Name: "ด้านกีฬา",
	}
	db.Model(&TypeClub{}).Create(&sportsClubs)

	relationClubs := TypeClub{
		Name: "ด้านนักศึกษาสัมพันธ์",
	}
	db.Model(&TypeClub{}).Create(&relationClubs)

	socialClubs := TypeClub{
		Name: "ด้านพัฒนาสังคมและบำเพ็ญประโยชน์",
	}
	db.Model(&TypeClub{}).Create(&socialClubs)

	culturalClubs := TypeClub{
		Name: "ด้านศิลปวัฒนธรรม",
	}
	db.Model(&TypeClub{}).Create(&culturalClubs)

	academicClubs := TypeClub{
		Name: "ด้านวิชาการ",
	}
	db.Model(&TypeClub{}).Create(&academicClubs)
	
}
